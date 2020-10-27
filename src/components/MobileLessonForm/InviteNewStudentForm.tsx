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
import * as yup from 'yup';

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

  const { register, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: current.context.seedName ?? '',
      email: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    send({
      type: 'NEXT',
      student: {
        id: '1',
        name: data.name,
      },
    });
  };

  return (
    <Stack spacing={2} px={4} pt={4}>
      <Heading as="h3" fontSize="lg" textAlign="center">
        Invite a new student
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              ref={register()}
              type="text"
              id="name"
              name="name"
              width="100%"
              variant="outline"
              autoFocus
            />

            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              ref={register()}
              type="email"
              id="email"
              name="email"
              width="100%"
              variant="outline"
            />

            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
            isLoading={formState.isSubmitting}
          >
            Invite student
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
