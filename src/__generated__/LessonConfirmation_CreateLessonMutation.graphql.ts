/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CreateLessonInput = {
    endsAt: string;
    notes?: string | null;
    startsAt: string;
    studentId: string;
};
export type LessonConfirmation_CreateLessonMutationVariables = {
    input: CreateLessonInput;
};
export type LessonConfirmation_CreateLessonMutationResponse = {
    readonly createLesson: {
        readonly lesson: {
            readonly id: string;
            readonly startsAt: string;
            readonly endsAt: string;
            readonly notes: string | null;
            readonly student: {
                readonly id: string;
                readonly name: string;
            };
        } | null;
    } | null;
};
export type LessonConfirmation_CreateLessonMutation = {
    readonly response: LessonConfirmation_CreateLessonMutationResponse;
    readonly variables: LessonConfirmation_CreateLessonMutationVariables;
};



/*
mutation LessonConfirmation_CreateLessonMutation(
  $input: CreateLessonInput!
) {
  createLesson(input: $input) {
    lesson {
      id
      startsAt
      endsAt
      notes
      student {
        id
        name
      }
    }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateLessonPayload",
    "kind": "LinkedField",
    "name": "createLesson",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Event",
        "kind": "LinkedField",
        "name": "lesson",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "kind": "ScalarField",
            "name": "notes",
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
              (v1/*: any*/),
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
    "name": "LessonConfirmation_CreateLessonMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LessonConfirmation_CreateLessonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "2be18240e8be16930e61ba4bd4f84fee",
    "id": null,
    "metadata": {},
    "name": "LessonConfirmation_CreateLessonMutation",
    "operationKind": "mutation",
    "text": "mutation LessonConfirmation_CreateLessonMutation(\n  $input: CreateLessonInput!\n) {\n  createLesson(input: $input) {\n    lesson {\n      id\n      startsAt\n      endsAt\n      notes\n      student {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '1a376a4ead1b96d3132c7d3542d328a7';
export default node;
