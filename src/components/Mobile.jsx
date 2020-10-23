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
    <div className="bg-red-100">
      <div>{props.event.student.name}</div>
      <div>
        {format(props.event.startsAt, "H:mm")} -{" "}
        {format(props.event.endsAt, "H:mm")}
      </div>
    </div>
  );
};

const EventList = (props) => {
  return (
    <div>
      {props.events.map((event) => {
        return (
          <Fragment key={event.id}>
            <EventSummary event={event} />
            <div className="h-4" />
          </Fragment>
        );
      })}
    </div>
  );
};

const Mobile = () => {
  return (
    <Fragment>
      <MobileHeader>
        <div className="grid grid-cols-3">
          <MobileHeaderMenu />
          <MobileHeaderTitle>Schedule</MobileHeaderTitle>
        </div>
      </MobileHeader>

      <div className="h-16" />

      <EventList events={schedule} />
    </Fragment>
  );
};

// Default export for lazy loading
export default Mobile;
