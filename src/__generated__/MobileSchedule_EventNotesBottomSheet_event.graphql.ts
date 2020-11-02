/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type MobileSchedule_EventNotesBottomSheet_event = {
  readonly notes: string | null;
  readonly ' $refType': 'MobileSchedule_EventNotesBottomSheet_event';
};
export type MobileSchedule_EventNotesBottomSheet_event$data = MobileSchedule_EventNotesBottomSheet_event;
export type MobileSchedule_EventNotesBottomSheet_event$key = {
  readonly ' $data'?: MobileSchedule_EventNotesBottomSheet_event$data;
  readonly ' $fragmentRefs': FragmentRefs<'MobileSchedule_EventNotesBottomSheet_event'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'MobileSchedule_EventNotesBottomSheet_event',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'notes',
      storageKey: null,
    },
  ],
  type: 'Event',
  abstractKey: null,
};
(node as any).hash = '9d4adeb7be1bc66c26b9d4b67060972a';
export default node;
