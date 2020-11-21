import { Box, Button, Grid, Heading, Stack, Text } from '@chakra-ui/core';
import { useService } from '@xstate/react';
import format from 'date-fns/format';
import React, { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay/hooks';
import { ConnectionHandler } from 'relay-runtime';

import { LessonConfirmation_CreateLessonMutation } from '../../__generated__/LessonConfirmation_CreateLessonMutation.graphql';
import { BottomSheetHeader } from '../BottomSheetHeader';
import { LessonFormService } from './machine';

interface LessonConfirmationProps {
  service: LessonFormService;
}

export const LessonConfirmation: React.FC<LessonConfirmationProps> = (props) => {
  const [current, send] = useService(props.service);

  const [createLessonCommit, isInFlight] = useMutation<
    LessonConfirmation_CreateLessonMutation
  >(graphql`
    mutation LessonConfirmation_CreateLessonMutation($input: CreateLessonInput!) {
      createLesson(input: $input) {
        lesson {
          id
          startsAt
          endsAt
          notes
          student {
            id
            name
          }
        }
      }
    }
  `);

  const onConfirm = useCallback(() => {
    // Required so that TS can determine the correct TypeState
    if (!current.matches('confirmation')) {
      return null;
    }

    const { times, student, notes } = current.context;

    createLessonCommit({
      variables: {
        input: {
          studentId: student.id,
          startsAt: format(times.startsAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          endsAt: format(times.endsAt, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          notes: notes,
        },
      },
      onCompleted: (data, errors) => {
        if (errors) {
          console.log('handle errors here');
          return;
        }

        send({ type: 'LESSON_SCHEDULED' });
      },
      updater: (store) => {
        const createLessonRoot = store.getRootField('createLesson');

        if (!createLessonRoot) {
          return;
        }

        const lesson = createLessonRoot.getLinkedRecord('lesson');

        const root = store.getRoot();
        const events = ConnectionHandler.getConnection(root, 'EventList_events', {
          searchTerm: '',
        });

        if (!events) {
          return;
        }

        const lessonEdge = ConnectionHandler.createEdge(store, events, lesson, 'EventEdge');

        // TODO - Also fetch the cursor that we should insert this after
        ConnectionHandler.insertEdgeAfter(events, lessonEdge);
      },
    });
  }, [current, send, createLessonCommit]);

  // Required so that TS can determine the correct TypeState
  if (!current.matches('confirmation')) {
    return null;
  }

  const { times, student, notes } = current.context;

  return (
    <Stack spacing={2} px={4} pt={2}>
      <BottomSheetHeader onBack={() => send({ type: 'PREVIOUS' })}>Confirmation</BottomSheetHeader>

      <Box>
        <Stack spacing={4}>
          <Box>
            <Heading as="div" fontSize="md">
              Date
            </Heading>

            <Detail onChangeRequested={() => send({ type: 'GO_TO_TIME_SELECTION' })}>
              <Text>{format(times.startsAt, 'EEEE, do MMM')}</Text>
            </Detail>
          </Box>

          <Box>
            <Heading as="div" fontSize="md">
              Times
            </Heading>

            <Detail onChangeRequested={() => send({ type: 'GO_TO_TIME_SELECTION' })}>
              <Text>
                {format(times.startsAt, 'HH:mm')} - {format(times.endsAt, 'HH:mm')}
              </Text>
            </Detail>
          </Box>

          <Box>
            <Heading as="div" fontSize="md">
              Student
            </Heading>

            <Detail onChangeRequested={() => send({ type: 'GO_TO_STUDENT_SELECTION' })}>
              <Text>{student.name}</Text>
            </Detail>
          </Box>

          <Box>
            <Heading as="div" fontSize="md">
              Notes
            </Heading>

            <Detail onChangeRequested={() => send({ type: 'GO_TO_NOTES' })}>
              <Text>{notes && notes.length > 50 ? `${notes?.substring(0, 47)}...` : notes}</Text>
            </Detail>
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
              onClick={onConfirm}
              isLoading={isInFlight}
              isDisabled={isInFlight}
            >
              Confirm details
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

interface DetailProps {
  onChangeRequested: () => void;
}

const Detail: React.FC<DetailProps> = (props) => {
  return (
    <Grid gridTemplateColumns="auto auto" gridColumnGap="30px" alignItems="center">
      {props.children}

      <Box textAlign="right">
        <Button variant="link" color="teal.400" p={2} onClick={props.onChangeRequested}>
          Change
        </Button>
      </Box>
    </Grid>
  );
};
