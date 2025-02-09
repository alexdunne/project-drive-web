/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MobileScheduleQueryVariables = {};
export type MobileScheduleQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"MobileSchedule_EventList_events">;
};
export type MobileScheduleQuery = {
    readonly response: MobileScheduleQueryResponse;
    readonly variables: MobileScheduleQueryVariables;
};



/*
query MobileScheduleQuery {
  ...MobileSchedule_EventList_events
}

fragment MobileSchedule_CancelEventAction_event on Event {
  id
}

fragment MobileSchedule_EventList_events on RootQueryType {
  events(first: 10, searchTerm: "") {
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
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "searchTerm",
    "value": ""
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MobileScheduleQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MobileSchedule_EventList_events"
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MobileScheduleQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                      (v1/*: any*/)
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
        "storageKey": "events(first:10,searchTerm:\"\")"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
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
    "cacheID": "5e23457f9e4c880ffdea940faf79bb9e",
    "id": null,
    "metadata": {},
    "name": "MobileScheduleQuery",
    "operationKind": "query",
    "text": "query MobileScheduleQuery {\n  ...MobileSchedule_EventList_events\n}\n\nfragment MobileSchedule_CancelEventAction_event on Event {\n  id\n}\n\nfragment MobileSchedule_EventList_events on RootQueryType {\n  events(first: 10, searchTerm: \"\") {\n    edges {\n      node {\n        id\n        startsAt\n        student {\n          name\n          id\n        }\n        ...MobileSchedule_EventSummary_event\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MobileSchedule_EventNotesBottomSheet_event on Event {\n  notes\n}\n\nfragment MobileSchedule_EventRescheduleBottomSheet_event on Event {\n  id\n  startsAt\n  endsAt\n}\n\nfragment MobileSchedule_EventSummary_event on Event {\n  startsAt\n  endsAt\n  student {\n    name\n    id\n  }\n  ...MobileSchedule_EventNotesBottomSheet_event\n  ...MobileSchedule_EventRescheduleBottomSheet_event\n  ...MobileSchedule_CancelEventAction_event\n}\n"
  }
};
})();
(node as any).hash = '3b895b1f8dc8b348a97e0c43f7a9aed8';
export default node;
