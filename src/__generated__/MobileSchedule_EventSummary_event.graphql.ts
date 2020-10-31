/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type MobileSchedule_EventSummary_event = {
  readonly startsAt: string;
  readonly endsAt: string;
  readonly student: {
    readonly name: string;
  };
  readonly ' $fragmentRefs': FragmentRefs<
    'MobileSchedule_EventNotesBottomSheet_event' | 'MobileSchedule_EventRescheduleBottomSheet_event'
  >;
  readonly ' $refType': 'MobileSchedule_EventSummary_event';
};
export type MobileSchedule_EventSummary_event$data = MobileSchedule_EventSummary_event;
export type MobileSchedule_EventSummary_event$key = {
  readonly ' $data'?: MobileSchedule_EventSummary_event$data;
  readonly ' $fragmentRefs': FragmentRefs<'MobileSchedule_EventSummary_event'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'MobileSchedule_EventSummary_event',
  selections: [
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
    {
      alias: null,
      args: null,
      concreteType: 'Student',
      kind: 'LinkedField',
      name: 'student',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'name',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      args: null,
      kind: 'FragmentSpread',
      name: 'MobileSchedule_EventNotesBottomSheet_event',
    },
    {
      args: null,
      kind: 'FragmentSpread',
      name: 'MobileSchedule_EventRescheduleBottomSheet_event',
    },
  ],
  type: 'Event',
  abstractKey: null,
};
(node as any).hash = '3f16391447476d2ca79bcd9a65c17a4a';
export default node;
