/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type MobileSchedule_EventRescheduleBottomSheet_event = {
  readonly id: string;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly ' $refType': 'MobileSchedule_EventRescheduleBottomSheet_event';
};
export type MobileSchedule_EventRescheduleBottomSheet_event$data = MobileSchedule_EventRescheduleBottomSheet_event;
export type MobileSchedule_EventRescheduleBottomSheet_event$key = {
  readonly ' $data'?: MobileSchedule_EventRescheduleBottomSheet_event$data;
  readonly ' $fragmentRefs': FragmentRefs<'MobileSchedule_EventRescheduleBottomSheet_event'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'MobileSchedule_EventRescheduleBottomSheet_event',
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
  type: 'Event',
  abstractKey: null,
};
(node as any).hash = 'ae157463dfa94a6e8271ce8e2039e299';
export default node;
