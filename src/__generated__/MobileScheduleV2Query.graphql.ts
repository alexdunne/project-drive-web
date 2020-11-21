/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MobileScheduleV2QueryVariables = {
    start: string;
    end: string;
};
export type MobileScheduleV2QueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"MobileScheduleV2_EventList_schedule">;
};
export type MobileScheduleV2Query = {
    readonly response: MobileScheduleV2QueryResponse;
    readonly variables: MobileScheduleV2QueryVariables;
};



/*
query MobileScheduleV2Query(
  $start: DateTime!
  $end: DateTime!
) {
  ...MobileScheduleV2_EventList_schedule_R4GVn
}

fragment MobileScheduleV2_EventList_schedule_R4GVn on RootQueryType {
  schedule(first: 10, between: {start: $start, end: $end}) {
    edges {
      node {
        id
        startsAt
        endsAt
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "end"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "start"
},
v2 = [
  {
    "kind": "Variable",
    "name": "end",
    "variableName": "end"
  },
  {
    "kind": "Variable",
    "name": "start",
    "variableName": "start"
  }
],
v3 = [
  {
    "fields": (v2/*: any*/),
    "kind": "ObjectValue",
    "name": "between"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MobileScheduleV2Query",
    "selections": [
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "MobileScheduleV2_EventList_schedule"
      }
    ],
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MobileScheduleV2Query",
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
                    "kind": "ScalarField",
                    "name": "endsAt",
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
    "cacheID": "7331c20ae38feaa29fe3a2b421048fa7",
    "id": null,
    "metadata": {},
    "name": "MobileScheduleV2Query",
    "operationKind": "query",
    "text": "query MobileScheduleV2Query(\n  $start: DateTime!\n  $end: DateTime!\n) {\n  ...MobileScheduleV2_EventList_schedule_R4GVn\n}\n\nfragment MobileScheduleV2_EventList_schedule_R4GVn on RootQueryType {\n  schedule(first: 10, between: {start: $start, end: $end}) {\n    edges {\n      node {\n        id\n        startsAt\n        endsAt\n        student {\n          name\n          id\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '035073d11fb8cc796f6215aade749d7c';
export default node;
