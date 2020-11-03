/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type EventType = "LESSON" | "%future added value";
export type EventConflictsCheckInput = {
    endsAt: string;
    startsAt: string;
    type: EventType;
};
export type LessonTimeForm_eventConflictsCheck_QueryVariables = {
    input: EventConflictsCheckInput;
};
export type LessonTimeForm_eventConflictsCheck_QueryResponse = {
    readonly eventConflictsCheck: {
        readonly hasConflicts: boolean | null;
    } | null;
};
export type LessonTimeForm_eventConflictsCheck_Query = {
    readonly response: LessonTimeForm_eventConflictsCheck_QueryResponse;
    readonly variables: LessonTimeForm_eventConflictsCheck_QueryVariables;
};



/*
query LessonTimeForm_eventConflictsCheck_Query(
  $input: EventConflictsCheckInput!
) {
  eventConflictsCheck(input: $input) {
    hasConflicts
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EventConflictsCheckPayload",
    "kind": "LinkedField",
    "name": "eventConflictsCheck",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasConflicts",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LessonTimeForm_eventConflictsCheck_Query",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LessonTimeForm_eventConflictsCheck_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f0381f6fce6ccc3e031c0fa04ae323ec",
    "id": null,
    "metadata": {},
    "name": "LessonTimeForm_eventConflictsCheck_Query",
    "operationKind": "query",
    "text": "query LessonTimeForm_eventConflictsCheck_Query(\n  $input: EventConflictsCheckInput!\n) {\n  eventConflictsCheck(input: $input) {\n    hasConflicts\n  }\n}\n"
  }
};
})();
(node as any).hash = '9a3809e010afb6d7a69a56254a127f02';
export default node;
