/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EventListPaginationQuery2Variables = {
    count?: number | null;
    cursor?: string | null;
    end: string;
    start: string;
};
export type EventListPaginationQuery2Response = {
    readonly " $fragmentRefs": FragmentRefs<"MobileScheduleV2_EventList_schedule">;
};
export type EventListPaginationQuery2 = {
    readonly response: EventListPaginationQuery2Response;
    readonly variables: EventListPaginationQuery2Variables;
};



/*
query EventListPaginationQuery2(
  $count: Int = 10
  $cursor: String
  $end: DateTime!
  $start: DateTime!
) {
  ...MobileScheduleV2_EventList_schedule_1sRpVw
}

fragment MobileScheduleV2_EventList_schedule_1sRpVw on RootQueryType {
  schedule(first: $count, after: $cursor, between: {start: $start, end: $end}) {
    edges {
      node {
        id
        startsAt
        student {
          name
          id
        }
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "end"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "start"
  }
],
v1 = {
  "kind": "Variable",
  "name": "end",
  "variableName": "end"
},
v2 = {
  "kind": "Variable",
  "name": "start",
  "variableName": "start"
},
v3 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "fields": [
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "ObjectValue",
    "name": "between"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v4 = {
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
    "name": "EventListPaginationQuery2",
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
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "MobileScheduleV2_EventList_schedule"
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventListPaginationQuery2",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "EventConnection",
        "kind": "LinkedField",
        "name": "schedule",
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
                  (v4/*: any*/),
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
                      (v4/*: any*/)
                    ],
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
        "args": (v3/*: any*/),
        "filters": [
          "between"
        ],
        "handle": "connection",
        "key": "EventList_schedule",
        "kind": "LinkedHandle",
        "name": "schedule"
      }
    ]
  },
  "params": {
    "cacheID": "65a82011cc19982cb0034b246389d4c1",
    "id": null,
    "metadata": {},
    "name": "EventListPaginationQuery2",
    "operationKind": "query",
    "text": "query EventListPaginationQuery2(\n  $count: Int = 10\n  $cursor: String\n  $end: DateTime!\n  $start: DateTime!\n) {\n  ...MobileScheduleV2_EventList_schedule_1sRpVw\n}\n\nfragment MobileScheduleV2_EventList_schedule_1sRpVw on RootQueryType {\n  schedule(first: $count, after: $cursor, between: {start: $start, end: $end}) {\n    edges {\n      node {\n        id\n        startsAt\n        student {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8ffa810c777e1cd7dc713bbeb6aab7fc';
export default node;
