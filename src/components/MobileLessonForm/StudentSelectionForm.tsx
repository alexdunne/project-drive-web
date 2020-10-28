import '@reach/combobox/styles.css';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/core';
import { useService } from '@xstate/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, unstable_useTransition, useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import { graphql } from 'react-relay';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';

import { StudentSelectionForm_students$key } from '../../__generated__/StudentSelectionForm_students.graphql';
import { StudentSelectionFormQuery } from '../../__generated__/StudentSelectionFormQuery.graphql';
import { useDebounce } from '../../hooks/useDebounce';
import { zIndex } from '../../theme/z-index';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '../Combobox';
import { LessonFormService } from './machine';

interface Student {
  id: string;
  name: string;
}

interface StudentSelectionFormProps {
  service: LessonFormService;
}

export const StudentSelectionForm: React.FC<StudentSelectionFormProps> = (props) => {
  const [_, send] = useService(props.service);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const query = useLazyLoadQuery<StudentSelectionFormQuery>(
    graphql`
      query StudentSelectionFormQuery($searchTerm: String) {
        ...StudentSelectionForm_students @arguments(searchTerm: $searchTerm)
      }
    `,
    {}
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedStudent) {
      return;
    }

    send({
      type: 'NEXT',
      student: selectedStudent,
    });
  };

  return (
    <Stack spacing={2} px={4} pt={4}>
      <Heading as="h3" fontSize="lg" textAlign="center">
        Select a student
      </Heading>

      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="student">Student</FormLabel>

            {selectedStudent ? (
              <Box display="grid" gridTemplateColumns="auto auto" gridColumnGap="30px">
                <Text color="gray.800" py={2}>
                  {selectedStudent.name}
                </Text>

                <Box textAlign="right">
                  <Button variant="link" p={2} onClick={() => setSelectedStudent(null)}>
                    Change
                  </Button>
                </Box>
              </Box>
            ) : (
              <StudentSelectionInput
                id="student"
                students={query}
                onStudentSelected={(student) => {
                  setSelectedStudent(student);
                }}
                onCreateNewStudent={(name) => {
                  send({ type: 'GO_TO_CREATE_STUDENT', seedName: name });
                }}
              />
            )}
          </FormControl>

          <Button
            type="submit"
            width="100%"
            variantColor="blue"
            border="none"
            _focus={{
              outline: 'none',
              boxShadow: 'md',
            }}
            isDisabled={!selectedStudent}
          >
            Next
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

interface StudentSelectionInputProps {
  id: string;
  students: StudentSelectionForm_students$key;
  onStudentSelected: (student: Student) => void;
  onCreateNewStudent: (name: string) => void;
}

const StudentSelectionInput: React.FC<StudentSelectionInputProps> = (props) => {
  const [term, setTerm] = useState('');
  const [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 3000,
  });
  const debouncedSearchTerm = useDebounce(term);
  const CREATE_NEW_STUDENT_ID = 'CREATE_NEW_STUDENT';

  const { data, refetch } = usePaginationFragment(
    graphql`
      fragment StudentSelectionForm_students on RootQueryType
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
        searchTerm: { type: "String", defaultValue: "" }
      )
      @refetchable(queryName: "StudentSelectionFormPaginationQuery") {
        students(first: $count, after: $cursor, searchTerm: $searchTerm)
          @connection(key: "StudentSelectionForm_students", filters: ["searchTerm"]) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    props.students
  );

  useEffect(() => {
    startTransition(() => {
      refetch({ searchTerm: debouncedSearchTerm, first: 10 });
    });
  }, [startTransition, refetch, debouncedSearchTerm]);

  const students: Student[] = [];

  for (let edge of data.students?.edges ?? []) {
    const student = edge?.node;

    if (!student) {
      continue;
    }

    students.push(student);
  }

  return (
    <Combobox
      aria-label="Students"
      onSelect={(item) => {
        if (item === CREATE_NEW_STUDENT_ID) {
          props.onCreateNewStudent(term);
          return;
        }

        const student = students.find((student) => student.id === item);

        if (!student) {
          return;
        }

        props.onStudentSelected(student);
      }}
    >
      <InputGroup>
        <InputLeftElement height="100%">
          <Icon name="search" color="blue.300" />
        </InputLeftElement>

        <ComboboxInput
          id={props.id}
          autoComplete="off"
          px={8}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setTerm(e.currentTarget.value)}
        />

        <InputRightElement height="100%">
          <AnimatePresence>
            {isPending ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Box as={FiLoader} size="18px" color="blue.700" />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </InputRightElement>
      </InputGroup>

      {students && (
        <ComboboxPopover zIndex={zIndex.BottomSheet + 1}>
          {students.length > 0 ? (
            <ComboboxList>
              <Fragment>
                {students.map((student) => {
                  return (
                    <ComboboxOption key={student.id} value={student.id} padding={3}>
                      {student.name}
                    </ComboboxOption>
                  );
                })}

                <ComboboxOption value={CREATE_NEW_STUDENT_ID} padding={3}>
                  Click to invite a new student
                </ComboboxOption>
              </Fragment>
            </ComboboxList>
          ) : (
            <Button
              variant="link"
              display="block"
              color="gray.700"
              fontSize="sm"
              padding={3}
              onClick={() => {
                props.onCreateNewStudent(term);
              }}
            >
              No student found. Click to invite a new student
            </Button>
          )}
        </ComboboxPopover>
      )}
    </Combobox>
  );
};
