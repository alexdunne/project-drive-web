import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isTomorrow from 'date-fns/isTomorrow';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FiCalendar, FiFile, FiPlus } from 'react-icons/fi';
import { graphql, useFragment, useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';

import { MobileSchedule_EventList_events$key } from '../__generated__/MobileSchedule_EventList_events.graphql';
import { MobileSchedule_EventSummary_events$key } from '../__generated__/MobileSchedule_EventSummary_events.graphql';
import { MobileScheduleQuery } from '../__generated__/MobileScheduleQuery.graphql';
import { MobileHeader, MobileHeaderMenu, MobileHeaderTitle } from './MobileHeader';
import { MobileLessonForm } from './MobileLessonForm';
import { Todo } from './Todo';

const MotionBox = motion.custom(Box);

const MobileSchedule = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [searchInputValue, setSearchInputValue] = useState('');

  const events = useLazyLoadQuery<MobileScheduleQuery>(
    graphql`
      query MobileScheduleQuery {
        ...MobileSchedule_EventList_events
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
          <SearchInput value={searchInputValue} onChange={setSearchInputValue} />
        </Box>

        <Box>
          <EventList events={events} />
        </Box>
      </Stack>

      <MobileLessonForm isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
};

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <InputGroup>
      <InputLeftElement height="100%">
        <Icon name="search" color="blue.700" />
      </InputLeftElement>
      <Input
        type="text"
        variant="filled"
        placeholder="Search"
        aria-label="Search your schedule"
        borderRadius="md"
        bg="gray.50"
        color="gray.700"
        px={6}
        py={6}
        value={props.value}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          props.onChange(e.currentTarget.value);
        }}
      />
    </InputGroup>
  );
};

interface EventListProps {
  events: MobileSchedule_EventList_events$key;
}

const EventList: React.FC<EventListProps> = (props) => {
  const { data, loadNext } = usePaginationFragment(
    graphql`
      fragment MobileSchedule_EventList_events on RootQueryType
      @argumentDefinitions(count: { type: "Int", defaultValue: 1 }, cursor: { type: "String" })
      @refetchable(queryName: "EventListPaginationQuery") {
        events(first: $count, after: $cursor) @connection(key: "EventList_events") {
          edges {
            node {
              id
              ...MobileSchedule_EventSummary_events
            }
          }
        }
      }
    `,
    props.events
  );

  if (!data.events?.edges) {
    return <Todo>Implement empty events</Todo>;
  }

  return (
    <Stack as={AnimatePresence} spacing={6}>
      {data.events?.edges.map((edge) => {
        const event = edge?.node;

        if (!event) {
          return null;
        }

        return (
          <MotionBox
            key={event.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EventSummary event={event} />
          </MotionBox>
        );
      })}

      <Button onClick={() => loadNext(1)}>Load more</Button>
    </Stack>
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

    return format(startsAt, 'eeee');
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
