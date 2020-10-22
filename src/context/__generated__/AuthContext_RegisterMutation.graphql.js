/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RegisterInput = {|
  email: string,
  name: string,
  password: string,
|};
export type AuthContext_RegisterMutationVariables = {|
  input: RegisterInput
|};
export type AuthContext_RegisterMutationResponse = {|
  +register: ?{|
    +token: ?string,
    +user: ?{|
      +id: ?string
    |},
  |}
|};
export type AuthContext_RegisterMutation = {|
  variables: AuthContext_RegisterMutationVariables,
  response: AuthContext_RegisterMutationResponse,
|};
*/


/*
mutation AuthContext_RegisterMutation(
  $input: RegisterInput!
) {
  register(input: $input) {
    token
    user {
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "register",
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
    "name": "AuthContext_RegisterMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthContext_RegisterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e629066beee89c19b497a67a200ad8b3",
    "id": null,
    "metadata": {},
    "name": "AuthContext_RegisterMutation",
    "operationKind": "mutation",
    "text": "mutation AuthContext_RegisterMutation(\n  $input: RegisterInput!\n) {\n  register(input: $input) {\n    token\n    user {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b27963588e82bc094d5dfc04e1d1326f';

module.exports = node;
