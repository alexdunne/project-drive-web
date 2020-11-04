import { Box } from '@chakra-ui/core';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import React, { Fragment, useState } from 'react';
import { graphql } from 'react-relay';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';

import {
  MobileScheduleV2_EventList_schedule$data,
  MobileScheduleV2_EventList_schedule$key,
} from '../__generated__/MobileScheduleV2_EventList_schedule.graphql';
import { MobileScheduleV2Query } from '../__generated__/MobileScheduleV2Query.graphql';
import { MobileHeader, MobileHeaderMenu, MobileHeaderTitle } from './MobileHeader';

const getInitialScheduleDates = () => {
  const today = new Date();

  return {
    start: startOfMonth(today),
    end: endOfMonth(today),
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

      <Box height="90px" />

      <EventList schedule={query} />
    </Fragment>
  );
};

interface EventListProps {
  schedule: MobileScheduleV2_EventList_schedule$key;
}

const EventList: React.FC<EventListProps> = (props) => {
  const { data } = usePaginationFragment(
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
              student {
                name
              }
            }
          }
        }
      }
    `,
    props.schedule
  );

  // The events returned from the api are individual events
  // We want to convert them so they're chunked by month -> week -> day

  const eventsByWeek = chunkScheduleEvents(data);

  return <pre>{JSON.stringify(eventsByWeek, null, 2)}</pre>;
};

/**
 * Chunk a list of individual events into week number -> day
 * e.g.
 *  - 2020-11-01 A
 *  - 2020-11-01 X
 *  - 2020-11-02 B
 *  - 2020-11-04 C
 *  - 2020-11-10 D
 *
 * Would produce:
 *
 *  w44: {
 *   2020-11-01: [A, X]
 *  },
 *  w45: {
 *   2020-11-2: [B]
 *   2020-11-4: [C]
 *  },
 * w46: {
 *  2020-11-10: [D]
 * }
 *
 *
 * @param events
 */
const chunkScheduleEvents = (data: MobileScheduleV2_EventList_schedule$data) => {
  const edges = data.schedule?.edges ?? [];

  const events = [];

  for (let edge of edges) {
    const event = edge?.node;
    if (!event) {
      continue;
    }

    const startsAt = parseISO(event.startsAt);

    events.push({
      ...event,
      startsAt,
      startDate: format(startsAt, 'yyyy-MM-dd'),
      weekNumber: format(startsAt, 'I'),
    });
  }

  // const chunkedEvents = groupBy(events, (event) => event.weekNumber);

  const chunkedEvents = events.reduce((acc: any, event) => {
    const { startDate, weekNumber } = event;

    if (!acc[weekNumber]) {
      acc[weekNumber] = {};
    }

    if (!acc[weekNumber][startDate]) {
      acc[weekNumber][startDate] = [];
    }

    acc[weekNumber][startDate].push(event);

    return acc;
  }, {});

  console.log(chunkedEvents);

  return chunkedEvents;
};

// Default export for lazy loading
export default MobileScheduleV2;
