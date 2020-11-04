/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MobileScheduleV2_EventList_schedule = {
    readonly schedule: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly startsAt: string;
                readonly student: {
                    readonly name: string;
                };
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "MobileScheduleV2_EventList_schedule";
};
export type MobileScheduleV2_EventList_schedule$data = MobileScheduleV2_EventList_schedule;
export type MobileScheduleV2_EventList_schedule$key = {
    readonly " $data"?: MobileScheduleV2_EventList_schedule$data;
    readonly " $fragmentRefs": FragmentRefs<"MobileScheduleV2_EventList_schedule">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "schedule"
];
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./EventListPaginationQuery2.graphql.ts')
    }
  },
  "name": "MobileScheduleV2_EventList_schedule",
  "selections": [
    {
      "alias": "schedule",
      "args": [
        {
          "fields": [
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
          "kind": "ObjectValue",
          "name": "between"
        }
      ],
      "concreteType": "EventConnection",
      "kind": "LinkedField",
      "name": "__EventList_schedule_connection",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
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
                    }
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
    }
  ],
  "type": "RootQueryType",
  "abstractKey": null
};
})();
(node as any).hash = '8ffa810c777e1cd7dc713bbeb6aab7fc';
export default node;
