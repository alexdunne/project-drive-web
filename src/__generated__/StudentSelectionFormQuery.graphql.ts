/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type StudentSelectionFormQueryVariables = {
  searchTerm?: string | null;
};
export type StudentSelectionFormQueryResponse = {
  readonly ' $fragmentRefs': FragmentRefs<'StudentSelectionForm_students'>;
};
export type StudentSelectionFormQuery = {
  readonly response: StudentSelectionFormQueryResponse;
  readonly variables: StudentSelectionFormQueryVariables;
};

/*
query StudentSelectionFormQuery(
  $searchTerm: String
) {
  ...StudentSelectionForm_students_1CW4ID
}

fragment StudentSelectionForm_students_1CW4ID on RootQueryType {
  students(first: 10, searchTerm: $searchTerm) {
    edges {
      node {
        id
        name
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'searchTerm',
      },
    ],
    v1 = {
      kind: 'Variable',
      name: 'searchTerm',
      variableName: 'searchTerm',
    },
    v2 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 10,
      },
      v1 /*: any*/,
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'StudentSelectionFormQuery',
      selections: [
        {
          args: [v1 /*: any*/],
          kind: 'FragmentSpread',
          name: 'StudentSelectionForm_students',
        },
      ],
      type: 'RootQueryType',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'StudentSelectionFormQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'StudentConnection',
          kind: 'LinkedField',
          name: 'students',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'StudentEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Student',
                  kind: 'LinkedField',
                  name: 'node',
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
                      name: '__typename',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'cursor',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'PageInfo',
              kind: 'LinkedField',
              name: 'pageInfo',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'endCursor',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'hasNextPage',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v2 /*: any*/,
          filters: ['searchTerm'],
          handle: 'connection',
          key: 'StudentSelectionForm_students',
          kind: 'LinkedHandle',
          name: 'students',
        },
      ],
    },
    params: {
      cacheID: '06e503338eda860ad3f75155328fe069',
      id: null,
      metadata: {},
      name: 'StudentSelectionFormQuery',
      operationKind: 'query',
      text:
        'query StudentSelectionFormQuery(\n  $searchTerm: String\n) {\n  ...StudentSelectionForm_students_1CW4ID\n}\n\nfragment StudentSelectionForm_students_1CW4ID on RootQueryType {\n  students(first: 10, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
    },
  };
})();
(node as any).hash = 'c3e16e2a75b0590551bbf84121d0359b';
export default node;
