/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RescheduleLessonInput = {
  endsAt: string;
  lessonId: string;
  startsAt: string;
};
export type MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutationVariables = {
  input: RescheduleLessonInput;
};
export type MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutationResponse = {
  readonly rescheduleLesson: {
    readonly lesson: {
      readonly id: string;
      readonly startsAt: string;
      readonly endsAt: string;
    } | null;
  } | null;
};
export type MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation = {
  readonly response: MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutationResponse;
  readonly variables: MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutationVariables;
};

/*
mutation MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation(
  $input: RescheduleLessonInput!
) {
  rescheduleLesson(input: $input) {
    lesson {
      id
      startsAt
      endsAt
    }
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'RescheduleLessonPayload',
        kind: 'LinkedField',
        name: 'rescheduleLesson',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'Event',
            kind: 'LinkedField',
            name: 'lesson',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'id',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'startsAt',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'endsAt',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation',
      selections: v1 /*: any*/,
      type: 'RootMutationType',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: '6d93efd76d8893e551b52c1c43e0d18b',
      id: null,
      metadata: {},
      name: 'MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation',
      operationKind: 'mutation',
      text:
        'mutation MobileSchedule_EventRescheduleBottomSheet_RescheduleLessonMutation(\n  $input: RescheduleLessonInput!\n) {\n  rescheduleLesson(input: $input) {\n    lesson {\n      id\n      startsAt\n      endsAt\n    }\n  }\n}\n',
    },
  };
})();
(node as any).hash = '7bf9461446e9295089eaaa62ea64f200';
export default node;
