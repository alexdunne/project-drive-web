import { useMachine, useService } from '@xstate/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Suspense, useCallback, useEffect } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useQueryLoader } from 'react-relay/hooks';

import { useBottomSheetActions } from '../../hooks/useBottomSheetActions';
import { Todo } from '../Todo';
import { InviteNewStudentForm } from './InviteNewStudentForm';
import { LessonConfirmation } from './LessonConfirmation';
import { LessonNotesForm } from './LessonNotesForm';
import { LessonTimeForm } from './LessonTimeForm';
import { lessonFormMachine, LessonFormService, snapPoints } from './machine';
import { StudentSelectionForm, StudentSelectionFormPreloadQuery } from './StudentSelectionForm';

interface MobileLessonFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileLessonForm: React.FC<MobileLessonFormProps> = ({ isOpen, onClose }) => {
  const sheetRef = React.useRef<SheetRef>();
  const { snapTo } = useBottomSheetActions(sheetRef);

  const [current, send, service] = useMachine(lessonFormMachine, {
    actions: {
      onLessonCreated: onClose,
    },
  });

  useEffect(() => {
    if (isOpen) {
      snapTo(current.context.snapIndex);
    }
  }, [isOpen, snapTo, current.context.snapIndex]);

  const handleClose = useCallback(() => {
    onClose();
    send('RESET');
  }, [onClose, send]);

  return (
    <Sheet
      ref={sheetRef}
      isOpen={isOpen}
      onClose={handleClose}
      snapPoints={snapPoints}
      initialSnap={0}
    >
      {/*  @ts-ignore */}
      <Sheet.Container>
        <Sheet.Content>
          <AnimatePresence initial={false} exitBeforeEnter>
            <Suspense fallback={<Todo>Form loading...</Todo>}>
              <Form service={service} />
            </Suspense>
          </AnimatePresence>
        </Sheet.Content>
      </Sheet.Container>

      {/*  @ts-ignore */}
      <Sheet.Backdrop onClick={handleClose} />
    </Sheet>
  );
};

interface FormProps {
  service: LessonFormService;
}

const Form: React.FC<FormProps> = (props) => {
  const [current] = useService(props.service);

  const [queryReference, loadQuery] = useQueryLoader(StudentSelectionFormPreloadQuery);

  useEffect(() => {
    // TODO
    // Is this the best place for this coordination?
    // It might make sense to move this into the state machine.
    if (current.matches('studentSelection')) {
      loadQuery({
        first: 10,
        searchTerm: '',
      });
    }
  }, [current, loadQuery]);

  switch (true) {
    case current.matches('timeSelection'):
      return (
        <AnimatedWrapper key="lesson_time_form">
          <LessonTimeForm service={props.service} />
        </AnimatedWrapper>
      );
    case current.matches('studentSelection'):
      return (
        <AnimatedWrapper key="student_selection_form">
          {queryReference !== null ? (
            <StudentSelectionForm service={props.service} queryReference={queryReference as any} />
          ) : null}
        </AnimatedWrapper>
      );
    case current.matches('studentCreation'):
      return (
        <AnimatedWrapper key="student_creation_form">
          <InviteNewStudentForm service={props.service} />
        </AnimatedWrapper>
      );
    case current.matches('notes'):
      return (
        <AnimatedWrapper key="notes_form">
          <LessonNotesForm service={props.service} />
        </AnimatedWrapper>
      );
    case current.matches('confirmation'):
      return (
        <AnimatedWrapper key="confirmation">
          <LessonConfirmation service={props.service} />
        </AnimatedWrapper>
      );
    default:
      return null;
  }
};

const AnimatedWrapper: React.FC = (props) => {
  return (
    <motion.div
      initial={{}}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -window.innerWidth, opacity: 0 }}
      {...props}
    />
  );
};
