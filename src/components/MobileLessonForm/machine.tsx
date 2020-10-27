import { assign, createMachine, Interpreter } from 'xstate';

interface LessonTimes {
  startsAt: Date;
  endsAt: Date;
}

interface Student {
  id: string;
  name: string;
}

interface LessonFormContext {
  snapIndex: number;

  times?: LessonTimes;
  student?: Student;
  notes?: string;
  seedName?: string;
}

type GoToCreateStudentEvent = { type: 'GO_TO_CREATE_STUDENT'; seedName: string };

type LessonFormNextEvent =
  | { type: 'NEXT'; times: LessonTimes }
  | { type: 'NEXT'; student: Student }
  | { type: 'NEXT'; notes: string };

type LessonFormEvent =
  | { type: 'RESET' }
  | LessonFormNextEvent
  | { type: 'PREVIOUS' }
  | GoToCreateStudentEvent;

type LessonFormState =
  | {
      value: 'timeSelection';
      context: LessonFormContext;
    }
  | {
      value: 'studentSelection';
      context: LessonFormContext & {
        times: LessonTimes;
      };
    }
  | {
      value: 'studentCreation';
      context: LessonFormContext & {
        times: LessonTimes;
      };
    }
  | {
      value: 'notes';
      context: LessonFormContext & {
        times: LessonTimes;
        student: Student;
      };
    }
  | {
      value: 'confirmation';
      context: LessonFormContext & {
        times: LessonTimes;
        student: Student;
      };
    };

export type LessonFormService = Interpreter<
  LessonFormContext,
  any,
  LessonFormEvent,
  LessonFormState
>;

export const lessonFormMachine = createMachine<LessonFormContext, LessonFormEvent, LessonFormState>(
  {
    id: 'lessonForm',
    initial: 'timeSelection',
    context: {
      snapIndex: 0,
    },
    states: {
      timeSelection: {
        entry: ['setSnapIndexToTimeSelection'],
        on: {
          NEXT: {
            actions: ['cacheTimes'],
            target: 'studentSelection',
          },
        },
      },
      studentSelection: {
        entry: ['setSnapIndexToStudentSelection'],
        on: {
          PREVIOUS: {
            target: 'timeSelection',
          },
          NEXT: {
            actions: ['cacheStudent'],
            target: 'notes',
          },
          GO_TO_CREATE_STUDENT: {
            target: 'studentCreation',
          },
        },
      },
      studentCreation: {
        entry: ['setSnapIndexToStudentCreation', 'cacheSeedName'],
        exit: ['resetSeedName'],
        on: {
          NEXT: {
            actions: ['cacheStudent'],
            target: 'notes',
          },
          PREVIOUS: {
            target: 'studentSelection',
          },
        },
      },
      notes: {
        entry: ['setSnapIndexToNotes'],
        on: {
          NEXT: {
            actions: ['cacheNotes'],
            target: 'confirmation',
          },
        },
      },
      confirmation: {
        entry: ['setSnapIndexToConfirmation'],
      },
    },
    on: {
      RESET: {
        target: 'timeSelection',
      },
    },
  },
  {
    actions: {
      resetData: assign((ctx) => {
        return {};
      }),

      cacheTimes: assign<LessonFormContext, any>({
        times: (_, ev) => ev.times,
      }),
      cacheStudent: assign<LessonFormContext, any>({
        student: (_, ev) => ev.student,
      }),
      cacheNotes: assign<LessonFormContext, any>({
        notes: (_, ev) => ev.notes,
      }),

      cacheSeedName: assign<LessonFormContext, any>({
        seedName: (_, ev) => ev.seedName ?? '',
      }),
      resetSeedName: assign({
        seedName: (_) => undefined,
      }),

      setSnapIndexToTimeSelection: assign({
        snapIndex: () => findSnapPointIndex(TIME_SELECTION_SNAP_POINT),
      }),
      setSnapIndexToStudentSelection: assign({
        snapIndex: () => findSnapPointIndex(STUDENT_SELECTION_SNAP_POINT),
      }),
      setSnapIndexToStudentCreation: assign({
        snapIndex: () => findSnapPointIndex(STUDENT_CREATION_SNAP_POINT),
      }),
      setSnapIndexToNotes: assign({
        snapIndex: () => findSnapPointIndex(NOTES_SNAP_POINT),
      }),
      setSnapIndexToConfirmation: assign({
        snapIndex: () => findSnapPointIndex(CONFIRMATION_SNAP_POINT),
      }),
    },
  }
);

const TIME_SELECTION_SNAP_POINT = 1;
const STUDENT_SELECTION_SNAP_POINT = 2;
const STUDENT_CREATION_SNAP_POINT = 3;
const NOTES_SNAP_POINT = 4;
const CONFIRMATION_SNAP_POINT = 5;

type SnapPointKey =
  | typeof TIME_SELECTION_SNAP_POINT
  | typeof STUDENT_SELECTION_SNAP_POINT
  | typeof STUDENT_CREATION_SNAP_POINT
  | typeof NOTES_SNAP_POINT
  | typeof CONFIRMATION_SNAP_POINT;

// Largest needs to go first otherwise the height offset is wrong
const snapPointConfig = [
  {
    id: CONFIRMATION_SNAP_POINT,
    snapPoint: 375,
  },
  {
    id: TIME_SELECTION_SNAP_POINT,
    snapPoint: 325,
  },
  {
    id: STUDENT_CREATION_SNAP_POINT,
    snapPoint: 300,
  },
  {
    id: STUDENT_SELECTION_SNAP_POINT,
    snapPoint: 250,
  },
  {
    id: NOTES_SNAP_POINT,
    snapPoint: 250,
  },
];

const findSnapPointIndex = (key: SnapPointKey) => {
  return snapPointConfig.findIndex((point) => point.id === key);
};

export const snapPoints = snapPointConfig.map((point) => point.snapPoint);
