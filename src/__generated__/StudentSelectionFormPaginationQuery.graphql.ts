/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type StudentSelectionFormPaginationQueryVariables = {
  count?: number | null;
  cursor?: string | null;
  searchTerm?: string | null;
};
export type StudentSelectionFormPaginationQueryResponse = {
  readonly ' $fragmentRefs': FragmentRefs<'StudentSelectionForm_students'>;
};
export type StudentSelectionFormPaginationQuery = {
  readonly response: StudentSelectionFormPaginationQueryResponse;
  readonly variables: StudentSelectionFormPaginationQueryVariables;
};

/*
query StudentSelectionFormPaginationQuery(
  $count: Int = 10
  $cursor: String
  $searchTerm: String = ""
) {
  ...StudentSelectionForm_students_1YZSDV
}

fragment StudentSelectionForm_students_1YZSDV on RootQueryType {
  students(first: $count, after: $cursor, searchTerm: $searchTerm) {
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
        defaultValue: 10,
        kind: 'LocalArgument',
        name: 'count',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'cursor',
      },
      {
        defaultValue: '',
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
        kind: 'Variable',
        name: 'after',
        variableName: 'cursor',
      },
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'count',
      },
      v1 /*: any*/,
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'StudentSelectionFormPaginationQuery',
      selections: [
        {
          args: [
            {
              kind: 'Variable',
              name: 'count',
              variableName: 'count',
            },
            {
              kind: 'Variable',
              name: 'cursor',
              variableName: 'cursor',
            },
            v1 /*: any*/,
          ],
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
      name: 'StudentSelectionFormPaginationQuery',
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
      cacheID: '4dfd239e348a70a4f0a937f9bd86e36b',
      id: null,
      metadata: {},
      name: 'StudentSelectionFormPaginationQuery',
      operationKind: 'query',
      text:
        'query StudentSelectionFormPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $searchTerm: String = ""\n) {\n  ...StudentSelectionForm_students_1YZSDV\n}\n\nfragment StudentSelectionForm_students_1YZSDV on RootQueryType {\n  students(first: $count, after: $cursor, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n',
    },
  };
})();
(node as any).hash = '6266d98daf267b80a0a3f2ecc5d8668a';
export default node;
