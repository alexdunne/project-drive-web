import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Stack,
} from '@chakra-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import parse from 'date-fns/parse';
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { fetchQuery, graphql, useRelayEnvironment } from 'react-relay/hooks';
import * as yup from 'yup';

import { LessonTimeForm_eventConflictsCheck_Query } from '../../__generated__/LessonTimeForm_eventConflictsCheck_Query.graphql';
import { UserFacingError } from '../../error/BaseErrors';
import { BottomSheetHeader } from '../BottomSheetHeader';

const eventConflictsCheckQuery = graphql`
  query LessonTimeForm_eventConflictsCheck_Query($input: EventConflictsCheckInput!) {
    eventConflictsCheck(input: $input) {
      hasConflicts
    }
  }
`;

const schema = yup.object().shape({
  date: yup.date().required(),
  startTime: yup.string().required('required'),
  endTime: yup
    .string()
    .required('required')
    .test('is-greater', 'this should be after the start time', function (value) {
      const { startTime } = this.parent;

      const start = parse(startTime, 'HH:mm', new Date());
      const end = parse(value as string, 'HH:mm', new Date());

      return isAfter(end, start);
    }),
});

interface FormValues {
  date: Date;
  startTime: string;
  endTime: string;
}

interface LessonTimeFormProps {
  defaultValues?: {
    startsAt: Date;
    endsAt: Date;
  };
  onSubmit: (data: FormValues) => void;
}

export const LessonTimeForm: React.FC<LessonTimeFormProps> = ({ defaultValues, onSubmit }) => {
  const environment = useRelayEnvironment();

  const defaultFormValues = useMemo(() => {
    const startsAt =
      defaultValues?.startsAt ?? roundToNearestMinutes(addHours(new Date(), 1), { nearestTo: 15 });
    const endsAt =
      defaultValues?.endsAt ?? roundToNearestMinutes(addHours(new Date(), 2), { nearestTo: 15 });

    return {
      date: format(startsAt, 'yyyy-MM-dd'),
      startTime: format(startsAt, 'HH:mm'),
      endTime: format(endsAt, 'HH:mm'),
    };
  }, [defaultValues]);

  const { register, handleSubmit, errors, formState, setError, watch, clearErrors } = useForm<
    FormValues
  >({
    resolver: yupResolver(schema),
    defaultValues: defaultFormValues,
  });

  const { date, startTime, endTime } = watch(['date', 'startTime', 'endTime']);

  useEffect(() => {
    clearErrors();
  }, [date, startTime, endTime, clearErrors]);

  const onFormSubmit = useCallback(
    async (data: FormValues) => {
      const startsAt = parse(data.startTime, 'HH:mm', data.date);
      const endsAt = parse(data.endTime, 'HH:mm', data.date);

      const response = await fetchQuery<LessonTimeForm_eventConflictsCheck_Query>(
        environment,
        eventConflictsCheckQuery,
        {
          input: {
            type: 'LESSON',
            startsAt: format(startsAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            endsAt: format(endsAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          },
        }
      ).toPromise();

      if (response?.eventConflictsCheck?.hasConflicts == null) {
        throw new UserFacingError('Was unable to check for conflicts. Please try again later.');
      }

      if (response.eventConflictsCheck.hasConflicts) {
        setError('date', {
          type: 'manual',
          message: 'The provided times conflict with another event',
        });

        return;
      }

      onSubmit(data);
    },
    [environment, setError, onSubmit]
  );

  return (
    <Stack spacing={2} px={4} pt={2}>
      <BottomSheetHeader>Schedule a lesson</BottomSheetHeader>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={Boolean(errors.date)}>
            <FormLabel htmlFor="date">Date</FormLabel>

            <Input
              ref={register()}
              type="date"
              id="date"
              name="date"
              width="100%"
              variant="outline"
            />

            <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
          </FormControl>

          <Grid gridTemplateColumns="repeat(2, 1fr)" gap="30px">
            <FormControl isInvalid={Boolean(errors.startTime)}>
              <FormLabel htmlFor="startTime">Start</FormLabel>
              <Input
                ref={register()}
                type="time"
                id="startTime"
                name="startTime"
                width="100%"
                variant="outline"
              />

              <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.endTime)}>
              <FormLabel htmlFor="endTime">End</FormLabel>
              <Input
                ref={register()}
                type="time"
                id="endTime"
                name="endTime"
                width="100%"
                variant="outline"
              />

              <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
            </FormControl>
          </Grid>

          <Box pt={6}>
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
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};
