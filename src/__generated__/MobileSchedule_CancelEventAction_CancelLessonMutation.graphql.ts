/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DeleteLessonInput = {
    lessonId: string;
};
export type MobileSchedule_CancelEventAction_CancelLessonMutationVariables = {
    input: DeleteLessonInput;
};
export type MobileSchedule_CancelEventAction_CancelLessonMutationResponse = {
    readonly deleteLesson: {
        readonly id: string;
    } | null;
};
export type MobileSchedule_CancelEventAction_CancelLessonMutation = {
    readonly response: MobileSchedule_CancelEventAction_CancelLessonMutationResponse;
    readonly variables: MobileSchedule_CancelEventAction_CancelLessonMutationVariables;
};



/*
mutation MobileSchedule_CancelEventAction_CancelLessonMutation(
  $input: DeleteLessonInput!
) {
  deleteLesson(input: $input) {
    id
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
    "concreteType": "DeleteLessonPayload",
    "kind": "LinkedField",
    "name": "deleteLesson",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "MobileSchedule_CancelEventAction_CancelLessonMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MobileSchedule_CancelEventAction_CancelLessonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "53ffb80f2cb50bf485695dd545d5b8ba",
    "id": null,
    "metadata": {},
    "name": "MobileSchedule_CancelEventAction_CancelLessonMutation",
    "operationKind": "mutation",
    "text": "mutation MobileSchedule_CancelEventAction_CancelLessonMutation(\n  $input: DeleteLessonInput!\n) {\n  deleteLesson(input: $input) {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '3edabc90319a6daac4f86d4de299eb32';
export default node;
