/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateStudentInviteInput = {
  email: string;
  name: string;
};
export type InviteNewStudentForm_CreateStudentInviteMutationVariables = {
  input: CreateStudentInviteInput;
};
export type InviteNewStudentForm_CreateStudentInviteMutationResponse = {
  readonly createStudentInvite: {
    readonly student: {
      readonly id: string;
      readonly name: string;
      readonly email: string;
    } | null;
  } | null;
};
export type InviteNewStudentForm_CreateStudentInviteMutation = {
  readonly response: InviteNewStudentForm_CreateStudentInviteMutationResponse;
  readonly variables: InviteNewStudentForm_CreateStudentInviteMutationVariables;
};

/*
mutation InviteNewStudentForm_CreateStudentInviteMutation(
  $input: CreateStudentInviteInput!
) {
  createStudentInvite(input: $input) {
    student {
      id
      name
      email
    }
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'input',
            variableName: 'input',
          },
        ],
        concreteType: 'StudentInvitePayload',
        kind: 'LinkedField',
        name: 'createStudentInvite',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'Student',
            kind: 'LinkedField',
            name: 'student',
            plural: false,
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
                name: 'name',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'email',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'InviteNewStudentForm_CreateStudentInviteMutation',
      selections: v1 /*: any*/,
      type: 'RootMutationType',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'InviteNewStudentForm_CreateStudentInviteMutation',
      selections: v1 /*: any*/,
    },
    params: {
      cacheID: 'ebc053e7c76694614e2fc991d1096599',
      id: null,
      metadata: {},
      name: 'InviteNewStudentForm_CreateStudentInviteMutation',
      operationKind: 'mutation',
      text:
        'mutation InviteNewStudentForm_CreateStudentInviteMutation(\n  $input: CreateStudentInviteInput!\n) {\n  createStudentInvite(input: $input) {\n    student {\n      id\n      name\n      email\n    }\n  }\n}\n',
    },
  };
})();
(node as any).hash = '1139dd25b16afb041105ac79cd777a92';
export default node;
