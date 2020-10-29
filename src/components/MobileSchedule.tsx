import { Box, IconButton, List, ListItem, Stack, Text, useDisclosure } from '@chakra-ui/core';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FiCalendar, FiFile, FiPlus } from 'react-icons/fi';
import { graphql, useFragment, useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';

import { MobileSchedule_EventList_events$key } from '../__generated__/MobileSchedule_EventList_events.graphql';
import { MobileSchedule_EventSummary_events$key } from '../__generated__/MobileSchedule_EventSummary_events.graphql';
import { MobileScheduleQuery } from '../__generated__/MobileScheduleQuery.graphql';
import { useDebounce } from '../hooks/useDebounce';
import { MobileHeader, MobileHeaderMenu, MobileHeaderTitle } from './MobileHeader';
import { MobileLessonForm } from './MobileLessonForm';
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
              ...MobileSchedule_EventSummary_events
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
  event: MobileSchedule_EventSummary_events$key;
}

const EventSummary: React.FC<EventSummaryProps> = (props) => {
  const event = useFragment(
    graphql`
      fragment MobileSchedule_EventSummary_events on Event {
        startsAt
        endsAt
        student {
          name
        }
      }
    `,
    props.event
  );

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
        <EventSummaryAction color={color} icon={FiFile} label="Notes" onClick={() => {}} />

        <EventSummaryAction color={color} icon={FiCalendar} label="Reschedule" onClick={() => {}} />
      </Stack>
    </Box>
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
    <Box
      color={`${color}.300`}
      border="1px"
      borderColor={`${color}.300`}
      borderRadius="lg"
      px={2}
      py={1}
      {...rest}
    >
      <Box as={icon} display="inline-block" mr={1} />
      <Text as="span" fontSize="sm">
        {label}
      </Text>
    </Box>
  );
};

// Default export for lazy loading
export default MobileSchedule;
