import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Stack,
  Textarea,
} from '@chakra-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useService } from '@xstate/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { LessonFormService } from './machine';

const schema = yup.object().shape({
  notes: yup.string(),
});

interface FormValues {
  notes: string;
}

interface LessonNotesFormProps {
  service: LessonFormService;
}

export const LessonNotesForm: React.FC<LessonNotesFormProps> = (props) => {
  const [_current, send] = useService(props.service);

  const { register, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      notes: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    send({
      type: 'NEXT',
      notes: data.notes,
    });
  };

  return (
    <Stack spacing={2} px={4} pt={4}>
      <Heading as="h3" fontSize="lg" textAlign="center">
        Finishing touches
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={Boolean(errors.notes)}>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <Textarea ref={register()} id="notes" name="notes" width="100%" variant="outline" />

            <FormErrorMessage>{errors.notes?.message}</FormErrorMessage>
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
            Next
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
