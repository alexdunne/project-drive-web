/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LoginInput = {
    email: string;
    password: string;
};
export type AuthContext_LoginMutationVariables = {
    input: LoginInput;
};
export type AuthContext_LoginMutationResponse = {
    readonly login: {
        readonly token: string;
        readonly user: {
            readonly id: string;
        } | null;
    } | null;
};
export type AuthContext_LoginMutation = {
    readonly response: AuthContext_LoginMutationResponse;
    readonly variables: AuthContext_LoginMutationVariables;
};



/*
mutation AuthContext_LoginMutation(
  $input: LoginInput!
) {
  login(input: $input) {
    token
    user {
      id
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
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthContext_LoginMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthContext_LoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eb6ce280facb9d98d460e78560bc337f",
    "id": null,
    "metadata": {},
    "name": "AuthContext_LoginMutation",
    "operationKind": "mutation",
    "text": "mutation AuthContext_LoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '91201f73afd258448272942876205ad2';
export default node;
