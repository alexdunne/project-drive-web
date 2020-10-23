import { Box, Stack } from "@chakra-ui/core";
import React, { Fragment } from "react";
import format from "date-fns/format";

import {
  MobileHeader,
  MobileHeaderMenu,
  MobileHeaderTitle,
} from "./MobileHeader";

const schedule = [
  {
    id: 1,
    student: {
      name: "Jon Snow",
    },
    startsAt: new Date("2020-10-23T09:00Z"),
    endsAt: new Date("2020-10-23T10:00Z"),
  },
  {
    id: 2,
    student: {
      name: "Arya Stark",
    },
    startsAt: new Date("2020-10-23T12:00Z"),
    endsAt: new Date("2020-10-23T14:00Z"),
  },
];

const EventSummary = (props) => {
  return (
    <Box bg="red-100">
      <Box>{props.event.student.name}</Box>
      <Box>
        {format(props.event.startsAt, "H:mm")} -{" "}
        {format(props.event.endsAt, "H:mm")}
      </Box>
    </Box>
  );
};

const EventList = (props) => {
  return (
    <Stack spacing={2}>
      {props.events.map((event) => {
        return <EventSummary event={event} />;
      })}
    </Stack>
  );
};

const Mobile = () => {
  return (
    <Fragment>
      <MobileHeader>
        <Box display="grid" gridTemplateColumns="40px auto 40px" width="100%">
          <MobileHeaderMenu />
          <MobileHeaderTitle>Schedule</MobileHeaderTitle>
        </Box>
      </MobileHeader>

      <Box h="4rem" />

      <EventList events={schedule} />
    </Fragment>
  );
};

// Default export for lazy loading
export default Mobile;
