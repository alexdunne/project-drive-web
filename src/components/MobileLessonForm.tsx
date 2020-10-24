import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/core";
import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";

interface MobileLessonFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileLessonForm: React.FC<MobileLessonFormProps> = (props) => {
  // TODO - Move to state machine
  const [step, setStep] = useState(0);
  const sheetRef = React.useRef<SheetRef>();
  const snapTo = (i: number) => sheetRef.current?.snapTo(i);

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
    <Sheet ref={sheetRef} isOpen={props.isOpen} onClose={props.onClose} snapPoints={[300, 200]} initialSnap={0}>
      {/*  @ts-ignore */}
      <Sheet.Container>
        <Sheet.Content>
          <AnimatePresence initial={false} exitBeforeEnter>
            <FormComponent handleSubmit={handleSubmit} />
          </AnimatePresence>
        </Sheet.Content>
      </Sheet.Container>

      {/*  @ts-ignore */}
      <Sheet.Backdrop onClick={props.onClose} />
    </Sheet>
  );
};

const AnimatedWrapper: React.FC = (props) => {
  return (
    <motion.div
      initial={{ x: window.innerWidth, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -window.innerWidth, opacity: 0 }}
      {...props}
    />
  );
};

interface LessonTimeFormValues {
  date: string;
  startTime: string;
  endTime: string;
}

interface LessonTimeFormProps {
  handleSubmit: (form: LessonTimeFormValues) => void;
}

const LessonTimeForm: React.FC<LessonTimeFormProps> = (props) => {
  const [form, setForm] = useState<LessonTimeFormValues>({
    date: "test",
    startTime: "test",
    endTime: "test",
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    setForm((form) => {
      return {
        ...form,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.handleSubmit(form);
  };

  return (
    <AnimatedWrapper key="lesson_time_form">
      <form onSubmit={handleSubmit}>
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
      </form>
    </AnimatedWrapper>
  );
};

interface StudentSelectionFormValues {
  student: string;
}

interface StudentSelectionFormProps {
  handleSubmit: (form: StudentSelectionFormValues) => void;
}

const StudentSelectionForm: React.FC<StudentSelectionFormProps> = (props) => {
  const [form, setForm] = useState({
    student: "test",
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    setForm((form) => {
      return {
        ...form,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.handleSubmit(form);
  };

  return (
    <AnimatedWrapper key="student_selection_form">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} px={4} pt={4}>
          <FormControl>
            <FormLabel htmlFor="student">Student</FormLabel>
            <Input
              type="text"
              id="student"
              name="student"
              width="100%"
              variant="outline"
              value={form.student}
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
      </form>
    </AnimatedWrapper>
  );
};
