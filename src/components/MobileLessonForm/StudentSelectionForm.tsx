import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Stack,
} from '@chakra-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useService } from '@xstate/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { graphql } from 'react-relay';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay/hooks';
import * as yup from 'yup';

import { StudentSelectionForm_students$key } from '../../__generated__/StudentSelectionForm_students.graphql';
import { StudentSelectionFormQuery } from '../../__generated__/StudentSelectionFormQuery.graphql';
import { Todo } from '../Todo';
import { LessonFormService } from './machine';

const schema = yup.object().shape({
  studentName: yup.string(),
});

interface FormValues {
  name: string;
  student: {
    id: string;
    name: string;
  };
}

interface StudentSelectionFormProps {
  service: LessonFormService;
}

export const StudentSelectionForm: React.FC<StudentSelectionFormProps> = (props) => {
  const [_, send] = useService(props.service);

  const query = useLazyLoadQuery<StudentSelectionFormQuery>(
    graphql`
      query StudentSelectionFormQuery($searchTerm: String) {
        ...StudentSelectionForm_students @arguments(searchTerm: $searchTerm)
      }
    `,
    {}
  );

  const { handleSubmit, errors, formState, getValues } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    send({
      type: 'NEXT',
      student: {
        id: '1',
        name: 'Alex',
      },
    });
  };

  return (
    <Stack spacing={2} px={4} pt={4}>
      <Heading as="h3" fontSize="lg" textAlign="center">
        Select a student
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="name">Student</FormLabel>

            <StudentSelectionInput students={query} />

            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <Box textAlign="center">
            <Button
              variant="link"
              variantColor="orange"
              onClick={() => {
                const values = getValues();
                send({ type: 'GO_TO_CREATE_STUDENT', seedName: values.name });
              }}
            >
              Invite a new student
            </Button>
          </Box>

          <Button
            type="submit"
            width="100%"
            variantColor="blue"
            border="none"
            _focus={{
              outline: 'none',
              boxShadow: 'md',
            }}
            isLoading={formState.isSubmitting}
          >
            Next
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

interface StudentSelectionInputProps {
  students: StudentSelectionForm_students$key;
}

const StudentSelectionInput: React.FC<StudentSelectionInputProps> = (props) => {
  const _response = usePaginationFragment(
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

  // const students = (data.students?.edges ?? []).map((edge) => {
  //   const student = edge?.node;

  //   return {
  //     label: student?.name ?? 'test',
  //     value: student?.id ?? '1',
  //   };
  // });

  return <Todo>Implement autocomplete</Todo>;
};
