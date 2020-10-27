import { Box, Button, Heading, Stack, Text } from '@chakra-ui/core';
import { useService } from '@xstate/react';
import format from 'date-fns/format';
import React from 'react';

import { LessonFormService } from './machine';

interface LessonConfirmationProps {
  service: LessonFormService;
}

export const LessonConfirmation: React.FC<LessonConfirmationProps> = (props) => {
  const [current] = useService(props.service);

  // Required so that TS can determine the correct TypeState
  if (!current.matches('confirmation')) {
    return null;
  }

  const { times, student, notes } = current.context;

  return (
    <Stack spacing={2} px={4} pt={4}>
      <Heading as="h3" fontSize="lg" textAlign="center">
        Confirmation
      </Heading>

      <Box>
        <Stack spacing={4}>
          <Box>
            <Heading as="div" fontSize="md">
              Date
            </Heading>

            <Text>{format(times.startsAt, 'EEEE, do MMM')}</Text>
          </Box>

          <Box>
            <Heading as="div" fontSize="md">
              Times
            </Heading>

            <Text>
              {format(times.startsAt, 'HH:mm')} - {format(times.endsAt, 'HH:mm')}
            </Text>
          </Box>

          <Box>
            <Heading as="div" fontSize="md">
              Student
            </Heading>

            <Text>{student.name}</Text>
          </Box>

          <Box>
            <Heading as="div" fontSize="md">
              Notes
            </Heading>

            <Text>{notes && notes.length > 50 ? `${notes?.substring(0, 47)}...` : notes}</Text>
          </Box>

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
            >
              Confirm details
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};
