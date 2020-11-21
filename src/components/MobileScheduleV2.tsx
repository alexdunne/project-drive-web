import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/core';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import React, { forwardRef, Fragment, useMemo, useState } from 'react';
import { graphql } from 'react-relay';
import { useFragment, useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import {
  MobileScheduleV2_EventList_schedule$data,
  MobileScheduleV2_EventList_schedule$key,
} from '../__generated__/MobileScheduleV2_EventList_schedule.graphql';
import { MobileScheduleV2Query } from '../__generated__/MobileScheduleV2Query.graphql';
import { MobileHeader, MobileHeaderMenu, MobileHeaderTitle } from './MobileHeader';

const getInitialScheduleDates = () => {
  return {
    start: startOfMonth(new Date('2020-09-01T00:00:00Z')),
    end: endOfMonth(new Date('2020-12-21T00:00:00Z')),
  };
};

const MobileScheduleV2 = () => {
  const [scheduleDates, setScheduleDate] = useState(() => getInitialScheduleDates());

  const query = useLazyLoadQuery<MobileScheduleV2Query>(
    graphql`
      query MobileScheduleV2Query($start: DateTime!, $end: DateTime!) {
        ...MobileScheduleV2_EventList_schedule @arguments(start: $start, end: $end)
      }
    `,
    {
      start: format(scheduleDates.start, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      end: format(scheduleDates.end, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    }
  );

  return (
    <Fragment>
      <MobileHeader>
        <Box display="grid" gridTemplateColumns="40px auto 40px" width="100%">
          <MobileHeaderMenu />
          <MobileHeaderTitle>Appointments</MobileHeaderTitle>
          <Box />
          {/* <IconButton
            icon={FiPlus}
            aria-label="Add a new lesson"
            fontSize="30px"
            variant="ghost"
            onClick={onOpen}
          /> */}
        </Box>
      </MobileHeader>

      <Box height="72px" />

      <EventList startDate={scheduleDates.start} endDate={scheduleDates.end} schedule={query} />
    </Fragment>
  );
};

interface EventListProps {
  startDate: Date;
  endDate: Date;
  schedule: MobileScheduleV2_EventList_schedule$key;
}

const EventList: React.FC<EventListProps> = ({ startDate, endDate, schedule }) => {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment(
    graphql`
      fragment MobileScheduleV2_EventList_schedule on RootQueryType
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
        start: { type: "DateTime!" }
        end: { type: "DateTime!" }
      )
      @refetchable(queryName: "EventListPaginationQuery2") {
        schedule(first: $count, after: $cursor, between: { start: $start, end: $end })
          @connection(key: "EventList_schedule", filters: ["between"]) {
          edges {
            node {
              id
              startsAt
              endsAt
              student {
                name
              }
            }
          }
        }
      }
    `,
    schedule
  );

  const normalisedEvents = useMemo(() => {
    return normaliseEvents(startDate, endDate, data);
  }, [startDate, endDate, data]);

  return (
    <Schedule
      hasNextPage={hasNext}
      isNextPageLoading={isLoadingNext}
      events={normalisedEvents}
      onLoadNextPage={loadNext}
    />
  );
};

interface ScheduleProps {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  events: NormalisedEvents;
  onLoadNextPage: any;
}

const Schedule: React.FC<ScheduleProps> = (props) => {
  // Each row/item is a week

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = props.hasNextPage
    ? props.events.weekNumbers.size + 1
    : props.events.weekNumbers.size;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = props.isNextPageLoading ? () => {} : props.onLoadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !props.hasNextPage || index < itemCount;

  let rowHeights: number[] = [];

  // Event height is 64 + 8px margin bottom
  const EVENT_HEIGHT = 64 + 8;

  props.events.weekNumbers.forEach((weekNumber) => {
    const week = props.events.weeks.get(weekNumber);

    if (!week) {
      return;
    }

    // Account for the week title
    let rowHeight = 24;

    rowHeight += getEventsCountForWeek(props.events, weekNumber) * EVENT_HEIGHT;

    rowHeights.push(rowHeight);
  });

  const getItemSize = (index: number) => rowHeights[index];

  const Item = ({ index, style }: any) => {
    // let content;
    // if (!isItemLoaded(index)) {
    //   content = 'Loading...';
    // } else {
    //   content = props.events[index].name;
    // }

    const weekNumber = Array.from(props.events.weekNumbers)[index];
    const weekInfo = props.events.weeks.get(weekNumber);

    if (!weekInfo) {
      return null;
    }

    const days: any[] = [];

    weekInfo.days.forEach((dayKey, index) => {
      const dayInfo = props.events.days.get(dayKey);

      if (!dayInfo) {
        return;
      }

      const events: any[] = [];

      dayInfo.events.forEach((eventKey) => {
        const eventInfo = props.events.events.get(eventKey);

        if (!eventInfo) {
          return;
        }

        events.push(
          <Box key={eventKey} bg="red.100" p={2} borderRadius="md">
            <p>{eventInfo.title}</p>
            <p>{eventInfo.subtitle}</p>
          </Box>
        );
      });

      days.push(
        <Grid key={index} gridTemplateColumns="50px auto">
          <DayTitle name={dayInfo.name} number={dayInfo.number} />
          <Stack spacing={2}>{events}</Stack>
        </Grid>
      );
    });

    return (
      <div style={style}>
        <Box px={2}>
          <Box pl="50px">
            <WeekTitle>{weekInfo.title}</WeekTitle>
          </Box>

          <Stack spacing={2}>{days}</Stack>
        </Box>
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems as any}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={getItemSize}
                onItemsRendered={onItemsRendered}
                ref={ref}
                {...props}
              >
                {Item}
              </List>
            )}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

const WeekTitle: React.FC = (props) => {
  return (
    <Text fontWeight="semibold" fontSize="xs" textTransform="uppercase" color="gray.300">
      {props.children}
    </Text>
  );
};

interface DayTitleProps {
  name: string;
  number: string;
}

const DayTitle: React.FC<DayTitleProps> = (props) => {
  return (
    <Box textAlign="center">
      <Text fontWeight="semibold" fontSize="xs" textTransform="uppercase" color="gray.300">
        {props.name}
      </Text>
      <Text fontWeight="semibold" fontSize="lg" color="gray.300">
        {props.number}
      </Text>
    </Box>
  );
};

interface NormalisedEvents {
  weekNumbers: Set<string>;
  weeks: Map<string, { title: string; days: Set<string> }>;
  days: Map<string, { name: string; number: string; events: Set<string> }>;
  events: Map<string, { title: string; subtitle: string }>;
}

/**
 * Normalise the individual events into a week number -> day -> event relation ship
 * where the parent contains a list of the children by id
 */
const normaliseEvents = (
  startDate: Date,
  endDate: Date,
  data: MobileScheduleV2_EventList_schedule$data
): NormalisedEvents => {
  const weekNumbers = new Set<string>();
  const weeks = new Map();
  const days = new Map();
  const events = new Map();

  // Create a list of week numbers and a map keyed by the week number
  const weekStarts = eachWeekOfInterval({ start: startDate, end: endDate });

  for (let weekStart of weekStarts) {
    const weekEnd = endOfWeek(weekStart);
    const weekNumber = format(weekStart, 'I');

    weekNumbers.add(weekNumber);

    weeks.set(weekNumber, {
      title: `${format(weekStart, 'MMMM d')} - ${format(weekEnd, 'MMMM d')}`,
      days: new Set(),
    });
  }

  // Now build up the days and events maps whilst adding them to the relevant parent
  const edges = data.schedule?.edges ?? [];

  for (let edge of edges) {
    const event = edge?.node;

    if (!event) {
      continue;
    }

    const startsAt = parseISO(event.startsAt);
    const endsAt = parseISO(event.endsAt);
    const weekNumber = format(startsAt, 'I');
    const startDate = format(startsAt, 'yyyy-MM-dd');

    weeks.get(weekNumber).days.add(startDate);

    if (!days.has(startDate)) {
      days.set(startDate, {
        name: format(startsAt, 'E'),
        number: format(startsAt, 'd'),
        events: new Set(),
      });
    }

    days.get(startDate).events.add(event.id);

    events.set(event.id, {
      title: event.student.name,
      subtitle: `${format(startsAt, 'HH:mm')} - ${format(endsAt, 'HH:mm')}`,
    });
  }

  return {
    weekNumbers,
    weeks,
    days,
    events,
  };
};

const getEventsCountForWeek = (events: NormalisedEvents, weekNumber: string) => {
  let count = 0;

  events.weeks.get(weekNumber)?.days.forEach((day) => {
    count += events.days.get(day)?.events.size ?? 0;
  });

  return count;
};

// Default export for lazy loading
export default MobileScheduleV2;
