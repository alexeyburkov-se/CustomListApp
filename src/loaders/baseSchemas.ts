import { z } from "zod";

export const ZodValidationStringPropTypes = z.enum(["text", "label", "title"]);

export type StringPropTypes = z.infer<typeof ZodValidationStringPropTypes>;

export const ZodValidationBooleanPropTypes = z.enum(["checkBox"]);

export type BooleanPropTypes = z.infer<typeof ZodValidationBooleanPropTypes>;

export const ZodValidationNumberPropTypes = z.enum(["rating"]);

export type NumberPropTypes = z.infer<typeof ZodValidationNumberPropTypes>;

export const ZodValidationRatioPropTypes = z.enum(["ratingRatio"]);

export type RatioPropTypes = z.infer<typeof ZodValidationRatioPropTypes>;

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
