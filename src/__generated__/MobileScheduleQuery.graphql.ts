/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type MobileScheduleQueryVariables = {
  searchTerm?: string | null;
};
export type MobileScheduleQueryResponse = {
  readonly ' $fragmentRefs': FragmentRefs<'MobileSchedule_EventList_events'>;
};
export type MobileScheduleQuery = {
  readonly response: MobileScheduleQueryResponse;
  readonly variables: MobileScheduleQueryVariables;
};

/*
query MobileScheduleQuery(
  $searchTerm: String
) {
  ...MobileSchedule_EventList_events_1CW4ID
}

fragment MobileSchedule_EventList_events_1CW4ID on RootQueryType {
  events(first: 10, searchTerm: $searchTerm) {
    edges {
      node {
        id
        startsAt
        ...MobileSchedule_EventSummary_events
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

fragment MobileSchedule_EventSummary_events on Event {
  startsAt
  endsAt
  student {
    name
    id
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
    ],
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'MobileScheduleQuery',
      selections: [
        {
          args: [v1 /*: any*/],
          kind: 'FragmentSpread',
          name: 'MobileSchedule_EventList_events',
        },
      ],
      type: 'RootQueryType',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'MobileScheduleQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'EventConnection',
          kind: 'LinkedField',
          name: 'events',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'EventEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Event',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
                  selections: [
                    v3 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'startsAt',
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'endsAt',
                      storageKey: null,
                    },
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
                          name: 'name',
                          storageKey: null,
                        },
                        v3 /*: any*/,
                      ],
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
          filters: [],
          handle: 'connection',
          key: 'EventList_events',
          kind: 'LinkedHandle',
          name: 'events',
        },
      ],
    },
    params: {
      cacheID: 'd235ee4b926c92ee6610c8092d35c4ca',
      id: null,
      metadata: {},
      name: 'MobileScheduleQuery',
      operationKind: 'query',
      text:
        'query MobileScheduleQuery(\n  $searchTerm: String\n) {\n  ...MobileSchedule_EventList_events_1CW4ID\n}\n\nfragment MobileSchedule_EventList_events_1CW4ID on RootQueryType {\n  events(first: 10, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        startsAt\n        ...MobileSchedule_EventSummary_events\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MobileSchedule_EventSummary_events on Event {\n  startsAt\n  endsAt\n  student {\n    name\n    id\n  }\n}\n',
    },
  };
})();
(node as any).hash = '5ff5cc1e7495542fea6f360f548e86b8';
export default node;
