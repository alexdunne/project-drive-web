import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import parse from 'date-fns/parse';
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FiCalendar, FiFile, FiPlus } from 'react-icons/fi';
import Sheet from 'react-modal-sheet';
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
} from 'react-relay/hooks';

import { MobileSchedule_EventList_events$key } from '../__generated__/MobileSchedule_EventList_events.graphql';
import { MobileSchedule_EventNotesBottomSheet_event$key } from '../__generated__/MobileSchedule_EventNotesBottomSheet_event.graphql';
import { MobileSchedule_EventRescheduleBottomSheet_event$key } from '../__generated__/MobileSchedule_EventRescheduleBottomSheet_event.graphql';
import { MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation } from '../__generated__/MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation.graphql';
import { MobileSchedule_EventSummary_event$key } from '../__generated__/MobileSchedule_EventSummary_event.graphql';
import { MobileScheduleQuery } from '../__generated__/MobileScheduleQuery.graphql';
import { useDebounce } from '../hooks/useDebounce';
import { BottomSheetHeader } from './BottomSheetHeader';
import { MobileHeader, MobileHeaderMenu, MobileHeaderTitle } from './MobileHeader';
import { MobileLessonForm } from './MobileLessonForm';
import { LessonTimeForm } from './MobileLessonForm/LessonTimeForm';
import { MobileSearchInput } from './MobileSeachInput';

const MobileSchedule = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [searchInputValue, setSearchInputValue] = useState('');

  const deferredSearchTerm = useDebounce(searchInputValue);

  const events = useLazyLoadQuery<MobileScheduleQuery>(
    graphql`
      query MobileScheduleQuery($searchTerm: String) {
        ...MobileSchedule_EventList_events @arguments(searchTerm: $searchTerm)
      }
    `,
    {}
  );

  return (
    <Fragment>
      <MobileHeader>
        <Box display="grid" gridTemplateColumns="40px auto 40px" width="100%">
          <MobileHeaderMenu />
          <MobileHeaderTitle>Appointments</MobileHeaderTitle>
          <IconButton
            icon={FiPlus}
            aria-label="Add a new lesson"
            fontSize="30px"
            variant="ghost"
            onClick={onOpen}
          />
        </Box>
      </MobileHeader>

      <Box height="90px" />

      <Stack spacing={8} px={4} pb={4}>
        <Box shadow="sm">
          <MobileSearchInput value={searchInputValue} onChange={setSearchInputValue} />
        </Box>

        <Box>
          <Suspense fallback={<p>Fetching events</p>}>
            <EventList events={events} searchTerm={deferredSearchTerm} />
          </Suspense>
        </Box>
      </Stack>

      <MobileLessonForm isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
};

interface EventListProps {
  events: MobileSchedule_EventList_events$key;
  searchTerm?: string;
}

const EventList: React.FC<EventListProps> = (props) => {
  const { data, refetch } = usePaginationFragment(
    graphql`
      fragment MobileSchedule_EventList_events on RootQueryType
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
        searchTerm: { type: "String", defaultValue: "" }
      )
      @refetchable(queryName: "EventListPaginationQuery") {
        events(first: $count, after: $cursor, searchTerm: $searchTerm)
          @connection(key: "EventList_events", filters: []) {
          edges {
            node {
              id
              startsAt
              ...MobileSchedule_EventSummary_event
            }
          }
        }
      }
    `,
    props.events
  );

  useEffect(() => {
    refetch({ first: 10, searchTerm: props.searchTerm });
  }, [refetch, props.searchTerm]);

  return (
    <List listStyleType="none" spacing={6}>
      {(data.events?.edges ?? []).map((edge) => {
        const event = edge?.node;

        if (!event) {
          return null;
        }

        return (
          <ListItem key={event.id}>
            <EventSummary event={event} />
          </ListItem>
        );
      })}
    </List>
  );
};

interface EventSummaryProps {
  event: MobileSchedule_EventSummary_event$key;
}

const EventSummary: React.FC<EventSummaryProps> = (props) => {
  const event = useFragment(
    graphql`
      fragment MobileSchedule_EventSummary_event on Event {
        startsAt
        endsAt
        student {
          name
        }
        ...MobileSchedule_EventNotesBottomSheet_event
        ...MobileSchedule_EventRescheduleBottomSheet_event
      }
    `,
    props.event
  );

  const { isOpen: isNotesOpen, onOpen: onOpenNotes, onClose: onCloseNotes } = useDisclosure();
  const {
    isOpen: isRescheduleOpen,
    onOpen: onOpenReschedule,
    onClose: onCloseReschedule,
  } = useDisclosure();

  const startsAt = useMemo(() => new Date(event.startsAt), [event]);
  const endsAt = useMemo(() => new Date(event.endsAt), [event]);

  const color = 'purple';
  const formattedEventDate = useMemo(() => {
    if (isToday(startsAt)) {
      return 'Today';
    }

    if (isTomorrow(startsAt)) {
      return 'Tomorrow';
    }

    return format(startsAt, 'eeee do');
  }, [startsAt]);

  return (
    <Fragment>
      <Box px={6} py={4} bg={`${color}.50`} borderRadius="md" shadow="sm">
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
          <Text color={`${color}.700`} fontWeight="semibold">
            {event.student.name}
          </Text>

          <Box textAlign="right">
            <Text color={`${color}.500`} fontSize="sm">
              {formattedEventDate}
            </Text>
          </Box>
        </Box>

        <Text color={`${color}.700`} fontSize="sm">
          {format(startsAt, 'H:mm')} - {format(endsAt, 'H:mm')}
        </Text>

        <Stack isInline spacing={4} pt={4}>
          <EventSummaryAction color={color} icon={FiFile} label="Notes" onClick={onOpenNotes} />
          <EventSummaryAction
            color={color}
            icon={FiCalendar}
            label="Reschedule"
            onClick={onOpenReschedule}
          />
        </Stack>
      </Box>

      <EventNotesBottomSheet event={event} isOpen={isNotesOpen} onClose={onCloseNotes} />
      <EventRescheduleBottomSheet
        event={event}
        isOpen={isRescheduleOpen}
        onClose={onCloseReschedule}
      />
    </Fragment>
  );
};

interface EventSummaryActionProps {
  color: string;
  icon: IconType;
  label: string;
  onClick: () => void;
}

const EventSummaryAction: React.FC<EventSummaryActionProps> = ({
  color,
  icon,
  label,
  onClick,
  ...rest
}) => {
  return (
    <Button
      color={`${color}.300`}
      bg="transparent"
      border="1px"
      borderColor={`${color}.300`}
      borderRadius="lg"
      px={2}
      py={1}
      onClick={onClick}
      {...rest}
    >
      <Box as={icon} display="inline-block" mr={1} />
      <Text as="span" fontSize="sm">
        {label}
      </Text>
    </Button>
  );
};

interface EventNotesBottomSheetProps {
  event: MobileSchedule_EventNotesBottomSheet_event$key;
  isOpen: boolean;
  onClose: () => void;
}

const EventNotesBottomSheet: React.FC<EventNotesBottomSheetProps> = (props) => {
  const event = useFragment(
    graphql`
      fragment MobileSchedule_EventNotesBottomSheet_event on Event {
        notes
      }
    `,
    props.event
  );

  return (
    <Sheet isOpen={props.isOpen} onClose={props.onClose} snapPoints={[300]} initialSnap={0}>
      {/*  @ts-ignore */}
      <Sheet.Container>
        {/*  @ts-ignore */}
        <Sheet.Header />
        <Sheet.Content>
          <Stack spacing={2} px={4}>
            <BottomSheetHeader>Notes</BottomSheetHeader>

            <Box
              height="200px"
              overflowY="auto"
              p={4}
              borderRadius="md"
              bg="gray.50"
              border="1px"
              borderColor="gray.200"
            >
              <Text>{event.notes}</Text>
            </Box>
          </Stack>
        </Sheet.Content>
      </Sheet.Container>

      {/*  @ts-ignore */}
      <Sheet.Backdrop onClick={props.onClose} />
    </Sheet>
  );
};

interface EventRescheduleBottomSheetProps {
  event: MobileSchedule_EventRescheduleBottomSheet_event$key;
  isOpen: boolean;
  onClose: () => void;
}

const EventRescheduleBottomSheet: React.FC<EventRescheduleBottomSheetProps> = (props) => {
  const event = useFragment(
    graphql`
      fragment MobileSchedule_EventRescheduleBottomSheet_event on Event {
        id
        startsAt
        endsAt
      }
    `,
    props.event
  );

  const [rescheduleCommit] = useMutation<
    MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation
  >(graphql`
    mutation MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation(
      $input: RescheduleLessonInput!
    ) {
      rescheduleLesson(input: $input) {
        lesson {
          id
          startsAt
          endsAt
        }
      }
    }
  `);

  const defaultValues = useMemo(() => {
    return {
      startsAt: new Date(event.startsAt),
      endsAt: new Date(event.endsAt),
    };
  }, [event]);

  return (
    <Sheet isOpen={props.isOpen} onClose={props.onClose} snapPoints={[350]} initialSnap={0}>
      {/*  @ts-ignore */}
      <Sheet.Container>
        {/*  @ts-ignore */}
        <Sheet.Header />
        <Sheet.Content>
          <LessonTimeForm
            defaultValues={defaultValues}
            onSubmit={(data) => {
              const startsAt = parse(data.startTime, 'HH:mm', data.date);
              const endsAt = parse(data.endTime, 'HH:mm', data.date);

              rescheduleCommit({
                variables: {
                  input: {
                    lessonId: event.id,
                    startsAt: format(startsAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
                    endsAt: format(endsAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
                  },
                },
                onCompleted: (response, errors) => {
                  if (errors) {
                    // TODO - Handle this
                    return;
                  }

                  // TODO - Do we need so kind of notification here? Toast message etc?
                  props.onClose();
                },
              });
            }}
          />
        </Sheet.Content>
      </Sheet.Container>

      {/*  @ts-ignore */}
      <Sheet.Backdrop onClick={props.onClose} />
    </Sheet>
  );
};

// Default export for lazy loading
export default MobileSchedule;
