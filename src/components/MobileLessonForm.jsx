import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Sheet from "react-modal-sheet";

export const MobileLessonForm = (props) => {
  // TODO - Move to state machine
  const [step, setStep] = useState(0);
  const sheetRef = React.useRef();
  const snapTo = (i) => sheetRef.current?.snapTo(i);

  useEffect(() => {
    setStep(0);
  }, [props.isOpen]);

  const steps = useMemo(() => {
    return [LessonTimeForm, StudentSelectionForm];
  }, []);

  const handleSubmit = useCallback(
    (data) => {
      console.log(data);

      setStep((step) => step + 1);
      snapTo(step + 1);
    },
    [step]
  );

  const FormComponent = steps[step];

  return (
    <Sheet
      ref={sheetRef}
      isOpen={props.isOpen}
      onClose={props.onClose}
      snapPoints={[300, 200]}
      initialSnap={0}
    >
      <Sheet.Container>
        <Sheet.Content>
          <AnimatePresence initial={false} exitBeforeEnter>
            <FormComponent handleSubmit={handleSubmit} />
          </AnimatePresence>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onClick={props.onClose} />
    </Sheet>
  );
};

const AnimatedForm = (props) => {
  return (
    <motion.form
      initial={{ x: window.innerWidth, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -window.innerWidth, opacity: 0 }}
      {...props}
    />
  );
};

const LessonTimeForm = (props) => {
  const [form, setForm] = useState({
    date: "test",
    startTime: "test",
    endTime: "test",
  });

  const handleInputChange = (e) => {
    const target = e.target;

    setForm((form) => {
      return {
        form,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(form);
  };

  return (
    <AnimatedForm key="lesson_time_form" onSubmit={handleSubmit}>
      <Stack spacing={4} px={4} pt={4}>
        <FormControl>
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input
            type="text"
            id="date"
            name="date"
            width="100%"
            variant="outline"
            value={form.date}
            onChange={handleInputChange}
          />
        </FormControl>

        <Stack isInline justifyContent="space-around">
          <FormControl>
            <FormLabel htmlFor="startTime">Start</FormLabel>
            <Input
              type="text"
              id="startTime"
              name="startTime"
              width="100%"
              variant="outline"
              value={form.startTime}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="end">End</FormLabel>
            <Input
              type="text"
              id="end"
              name="end"
              width="100%"
              variant="outline"
              value={form.endTime}
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>

        <Button
          type="submit"
          width="100%"
          variantColor="blue"
          border="none"
          _focus={{
            outline: "none",
            boxShadow: "md",
          }}
        >
          Next
        </Button>
      </Stack>
    </AnimatedForm>
  );
};

const StudentSelectionForm = (props) => {
  const [form, setForm] = useState({
    student: "test",
  });

  const handleInputChange = (e) => {
    const target = e.target;

    setForm((form) => {
      return {
        form,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.handleSubmit(form);
  };

  return (
    <AnimatedForm key="student_selection_form" onSubmit={handleSubmit}>
      <Stack spacing={4} px={4} pt={4}>
        <FormControl>
          <FormLabel htmlFor="date">Student</FormLabel>
          <Input
            type="text"
            id="date"
            name="date"
            width="100%"
            variant="outline"
            value={form.date}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button
          type="submit"
          width="100%"
          variantColor="blue"
          border="none"
          _focus={{
            outline: "none",
            boxShadow: "md",
          }}
        >
          Next
        </Button>
      </Stack>
    </AnimatedForm>
  );
};
