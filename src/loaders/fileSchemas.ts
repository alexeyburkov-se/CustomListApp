export enum StringPropTypes {
  Text = "text",
  Label = "label",
  Title = "title",
  Rating = "rating",
}

export enum BooleanPropTypes {
  CheckBox = "checkBox",
}

export enum NumberPropTypes {
  Rating = "rating",
}

export enum RatioPropTypes {
  RatingRatio = "ratingRatio",
}


export interface BaseListJsonSchema {
  version: string;
}

export interface ListJsonSchemaV1 extends BaseListJsonSchema {
  version: "1";
  main: {
    properties: (
      | {
          propName: string;
          propType: StringPropTypes;
          propValue: string;
        }
      | {
          propName: string;
          propType: BooleanPropTypes;
          propValue: boolean;
        }
      | {
          propName: string;
          propType: NumberPropTypes;
          propValue: number;
        }
      | {
          propName: string;
          propType: RatioPropTypes;
          propValue: [number, number];
        }
    )[];
  }[];
}
