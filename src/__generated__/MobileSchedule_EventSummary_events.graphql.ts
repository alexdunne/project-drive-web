/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MobileSchedule_EventSummary_events = {
    readonly startsAt: string;
    readonly endsAt: string;
    readonly student: {
        readonly name: string;
    };
    readonly " $refType": "MobileSchedule_EventSummary_events";
};
export type MobileSchedule_EventSummary_events$data = MobileSchedule_EventSummary_events;
export type MobileSchedule_EventSummary_events$key = {
    readonly " $data"?: MobileSchedule_EventSummary_events$data;
    readonly " $fragmentRefs": FragmentRefs<"MobileSchedule_EventSummary_events">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MobileSchedule_EventSummary_events",
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
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = '183acaa1e9b8a92e16ffdd5afc8440da';
export default node;
