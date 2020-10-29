import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useService } from '@xstate/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { graphql, useMutation } from 'react-relay/hooks';
import * as yup from 'yup';

import { InviteNewStudentForm_CreateStudentInviteMutation } from '../../__generated__/InviteNewStudentForm_CreateStudentInviteMutation.graphql';
import { ApiError } from '../../error/ApiError';
import { LessonFormService } from './machine';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
});

interface FormValues {
  name: string;
  email: string;
}

interface InviteNewStudentFormProps {
  service: LessonFormService;
}

export const InviteNewStudentForm: React.FC<InviteNewStudentFormProps> = (props) => {
  const [current, send] = useService(props.service);

  const { register, handleSubmit, errors, formState, setError } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: current.context.seedName ?? '',
      email: '',
    },
  });

  const [createStudentInviteCommit, isInFlight] = useMutation<
    InviteNewStudentForm_CreateStudentInviteMutation
  >(graphql`
    mutation InviteNewStudentForm_CreateStudentInviteMutation($input: CreateStudentInviteInput!) {
      createStudentInvite(input: $input) {
        student {
          id
          name
          email
        }
      }
    }
  `);

  const onSubmit = (data: FormValues) => {
    createStudentInviteCommit({
      variables: {
        input: {
          email: data.email,
          name: data.name,
        },
      },
      onCompleted: (data, errors) => {
        if (errors) {
          const apiErrors = (errors as unknown) as ApiError[];

          for (let error of apiErrors) {
            if (error.code === 'validation') {
              setError(error.extra.validation.field as any, {
                type: 'manual',
                message: error.extra.validation.error[0],
              });
            } else {
              console.log('TODO: handle error:');
              console.log(error);
            }
          }

          return;
        }

        if (!data.createStudentInvite || !data.createStudentInvite.student) {
          return;
        }

        send({
          type: 'NEXT',
          student: data.createStudentInvite.student,
        });
      },
      onError: (e) => {
        console.log('TODO');
        console.log(e);
      },
    });
  };

  const isSubmitting = formState.isSubmitting || isInFlight;

  return (
    <Stack spacing={2} px={4} pt={4}>
      <Heading as="h3" fontSize="lg" textAlign="center">
        Invite a new student
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              ref={register()}
              type="text"
              id="name"
              name="name"
              width="100%"
              variant="outline"
              autoFocus
              autoCapitalize="words"
            />

            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.email)}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              ref={register()}
              type="email"
              id="email"
              name="email"
              width="100%"
              variant="outline"
            />

            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Invite student
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
