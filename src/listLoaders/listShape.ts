import {
  NodeBooleanVariants,
  NodeStringVariants,
  NodeNumberVariants,
  NodeRatioVariants,
} from "../listItemComponents/itemComponentProcessor";

export interface BaseListShape {
  version: string;
}

export interface ListTypeV1 extends BaseListShape {
  version: "1.0.0";
  main: {
    properties: (
      | {
          propName: string;
          propType: NodeStringVariants;
          propValue: string;
        }
      | {
          propName: string;
          propType: NodeBooleanVariants;
          propValue: boolean;
        }
      | {
          propName: string;
          propType: NodeNumberVariants;
          propValue: number;
        }
      | {
          propName: string;
          propType: NodeRatioVariants;
          propValue: [number, number];
        }
    )[];
  }[];
}
