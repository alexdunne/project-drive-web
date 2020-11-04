/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventListPaginationQueryVariables = {
    count?: number | null;
    cursor?: string | null;
    searchTerm: string;
};
export type EventListPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"MobileSchedule_EventList_events">;
};
export type EventListPaginationQuery = {
    readonly response: EventListPaginationQueryResponse;
    readonly variables: EventListPaginationQueryVariables;
};



/*
query EventListPaginationQuery(
  $count: Int = 10
  $cursor: String
  $searchTerm: String! = ""
) {
  ...MobileSchedule_EventList_events_1YZSDV
}

fragment MobileSchedule_CancelEventAction_event on Event {
  id
}

fragment MobileSchedule_EventList_events_1YZSDV on RootQueryType {
  events(first: $count, after: $cursor, searchTerm: $searchTerm) {
    edges {
      node {
        id
        startsAt
        student {
          name
          id
        }
        ...MobileSchedule_EventSummary_event
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

fragment MobileSchedule_EventNotesBottomSheet_event on Event {
  notes
}

fragment MobileSchedule_EventRescheduleBottomSheet_event on Event {
  id
  startsAt
  endsAt
}

fragment MobileSchedule_EventSummary_event on Event {
  startsAt
  endsAt
  student {
    name
    id
  }
  ...MobileSchedule_EventNotesBottomSheet_event
  ...MobileSchedule_EventRescheduleBottomSheet_event
  ...MobileSchedule_CancelEventAction_event
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": "",
    "kind": "LocalArgument",
    "name": "searchTerm"
  }
],
v1 = {
  "kind": "Variable",
  "name": "searchTerm",
  "variableName": "searchTerm"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventListPaginationQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "MobileSchedule_EventList_events"
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "events",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Event",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                    "concreteType": "Student",
                    "kind": "LinkedField",
                    "name": "student",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
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
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "searchTerm"
        ],
        "handle": "connection",
        "key": "EventList_events",
        "kind": "LinkedHandle",
        "name": "events"
      }
    ]
  },
  "params": {
    "cacheID": "afb1fbf9b9b692f6cb1bf2d8c8337e5b",
    "id": null,
    "metadata": {},
    "name": "EventListPaginationQuery",
    "operationKind": "query",
    "text": "query EventListPaginationQuery(\n  $count: Int = 10\n  $cursor: String\n  $searchTerm: String! = \"\"\n) {\n  ...MobileSchedule_EventList_events_1YZSDV\n}\n\nfragment MobileSchedule_CancelEventAction_event on Event {\n  id\n}\n\nfragment MobileSchedule_EventList_events_1YZSDV on RootQueryType {\n  events(first: $count, after: $cursor, searchTerm: $searchTerm) {\n    edges {\n      node {\n        id\n        startsAt\n        student {\n          name\n          id\n        }\n        ...MobileSchedule_EventSummary_event\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MobileSchedule_EventNotesBottomSheet_event on Event {\n  notes\n}\n\nfragment MobileSchedule_EventRescheduleBottomSheet_event on Event {\n  id\n  startsAt\n  endsAt\n}\n\nfragment MobileSchedule_EventSummary_event on Event {\n  startsAt\n  endsAt\n  student {\n    name\n    id\n  }\n  ...MobileSchedule_EventNotesBottomSheet_event\n  ...MobileSchedule_EventRescheduleBottomSheet_event\n  ...MobileSchedule_CancelEventAction_event\n}\n"
  }
};
})();
(node as any).hash = '8eb869f8801a5a4a4fdc7f9bb12cac26';
export default node;
