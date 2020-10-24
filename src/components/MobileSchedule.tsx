import {
  Box,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import { FiFile, FiCalendar, FiPlus } from "react-icons/fi";

import { MobileHeader, MobileHeaderMenu, MobileHeaderTitle } from "./MobileHeader";
import { MobileLessonForm } from "./MobileLessonForm";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";

const MotionBox = motion.custom(Box);

interface ScheduleEvent {
  id: string;
  student: {
    name: string;
  };
  startsAt: Date;
  endsAt: Date;
}

const schedule: ScheduleEvent[] = [
  {
    id: "1",
    student: {
      name: "Jon Snow",
    },
    startsAt: new Date("2020-10-23T09:00Z"),
    endsAt: new Date("2020-10-23T10:00Z"),
  },
  {
    id: "2",
    student: {
      name: "Arya Stark",
    },
    startsAt: new Date("2020-10-23T12:00Z"),
    endsAt: new Date("2020-10-23T14:00Z"),
  },
  {
    id: "3",
    student: {
      name: "Sansa Stark",
    },
    startsAt: new Date("2020-10-24T12:00Z"),
    endsAt: new Date("2020-10-24T13:00Z"),
  },
  {
    id: "4",
    student: {
      name: "Rob Stark",
    },
    startsAt: new Date("2020-10-25T12:00Z"),
    endsAt: new Date("2020-10-25T14:00Z"),
  },
];

const formatEventDate = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  }

  if (isTomorrow(date)) {
    return "Tomorrow";
  }

  return format(date, "eeee");
};

interface EventSummaryActionProps {
  color: string;
  icon: IconType;
  label: string;
  onClick: () => void;
}

const EventSummaryAction: React.FC<EventSummaryActionProps> = ({ color, icon, label, onClick, ...rest }) => {
  return (
    <Box color={`${color}.300`} border="1px" borderColor={`${color}.300`} borderRadius="lg" px={2} py={1} {...rest}>
      <Box as={icon} display="inline-block" mr={1} />
      <Text as="span" fontSize="sm">
        {label}
      </Text>
    </Box>
  );
};

interface EventSummaryProps {
  event: ScheduleEvent;
}

const EventSummary: React.FC<EventSummaryProps> = (props) => {
  const color = "purple";

  return (
    <Box px={6} py={4} bg={`${color}.50`} borderRadius="md" shadow="sm">
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
        <Text color={`${color}.700`} fontWeight="semibold">
          {props.event.student.name}
        </Text>

        <Box textAlign="right">
          <Text color={`${color}.500`} fontSize="sm">
            {formatEventDate(props.event.startsAt)}
          </Text>
        </Box>
      </Box>

      <Text color={`${color}.700`} fontSize="sm">
        {format(props.event.startsAt, "H:mm")} - {format(props.event.endsAt, "H:mm")}
      </Text>

      <Stack isInline spacing={4} pt={4}>
        <EventSummaryAction color={color} icon={FiFile} label="Notes" onClick={() => {}} />

        <EventSummaryAction color={color} icon={FiCalendar} label="Reschedule" onClick={() => {}} />
      </Stack>
    </Box>
  );
};

interface EventListProps {
  events: ScheduleEvent[];
}

const EventList: React.FC<EventListProps> = (props) => {
  return (
    <Stack as={AnimatePresence} spacing={6}>
      {props.events.map((event) => {
        return (
          <MotionBox key={event.id} initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EventSummary event={event} />
          </MotionBox>
        );
      })}
    </Stack>
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

const MobileSchedule = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [searchInputValue, setSearchInputValue] = useState("");

  const events = schedule.filter((event) => {
    return event.student.name.toLowerCase().includes(searchInputValue.toLowerCase());
  });

  return (
    <Fragment>
      <MobileHeader>
        <Box display="grid" gridTemplateColumns="40px auto 40px" width="100%">
          <MobileHeaderMenu />
          <MobileHeaderTitle>Appointments</MobileHeaderTitle>
          <IconButton icon={FiPlus} aria-label="Add a new lesson" fontSize="30px" variant="ghost" onClick={onOpen} />
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

// Default export for lazy loading
export default MobileSchedule;
