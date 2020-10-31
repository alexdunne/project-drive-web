/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MobileSchedule_CancelEventAction_event = {
    readonly id: string;
    readonly " $refType": "MobileSchedule_CancelEventAction_event";
};
export type MobileSchedule_CancelEventAction_event$data = MobileSchedule_CancelEventAction_event;
export type MobileSchedule_CancelEventAction_event$key = {
    readonly " $data"?: MobileSchedule_CancelEventAction_event$data;
    readonly " $fragmentRefs": FragmentRefs<"MobileSchedule_CancelEventAction_event">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MobileSchedule_CancelEventAction_event",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Event",
  "abstractKey": null
};
(node as any).hash = 'a76bb035463034c0740df774ab9948b1';
export default node;
