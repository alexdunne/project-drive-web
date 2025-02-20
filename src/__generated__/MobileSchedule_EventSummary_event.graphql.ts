/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MobileSchedule_EventSummary_event = {
    readonly startsAt: string;
    readonly endsAt: string;
    readonly student: {
        readonly name: string;
    };
    readonly " $fragmentRefs": FragmentRefs<"MobileSchedule_EventNotesBottomSheet_event" | "MobileSchedule_EventRescheduleBottomSheet_event" | "MobileSchedule_CancelEventAction_event">;
    readonly " $refType": "MobileSchedule_EventSummary_event";
};
export type MobileSchedule_EventSummary_event$data = MobileSchedule_EventSummary_event;
export type MobileSchedule_EventSummary_event$key = {
    readonly " $data"?: MobileSchedule_EventSummary_event$data;
    readonly " $fragmentRefs": FragmentRefs<"MobileSchedule_EventSummary_event">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MobileSchedule_EventSummary_event",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startsAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endsAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Student",
      "kind": "LinkedField",
      "name": "student",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MobileSchedule_EventNotesBottomSheet_event"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MobileSchedule_EventRescheduleBottomSheet_event"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MobileSchedule_CancelEventAction_event"
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = '2c4478f8f85aa76393f53e80a54ab311';
export default node;
