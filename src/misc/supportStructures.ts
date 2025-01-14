import { z } from "zod";
import {
  StringPropTypesZodValidator,
  BooleanPropTypesZodValidator,
  NumberPropTypesZodValidator,
  RatioPropTypesZodValidator,
} from "../loaders/baseSchemas";

export const ListItemPropertyV1ZodValidatorGen = {
  yaml: z.union([
    z.object({
      propertyName: z.string(),
      propertyType: StringPropTypesZodValidator,
      propertyValue: z.string(),
    }),
    z.object({
      propertyName: z.string(),
      propertyType: BooleanPropTypesZodValidator,
      propertyValue: z.boolean(),
    }),
    z.object({
      propertyName: z.string(),
      propertyType: NumberPropTypesZodValidator,
      propertyValue: z.number(),
    }),
    z.object({
      propertyName: z.string(),
      propertyType: RatioPropTypesZodValidator,
      propertyValue: z.tuple([z.number(), z.number()]),
    }),
  ]),
  internal: z.union([
    z.object({
      n: z.string(),
      t: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      v: z.string(),
    }),
    z.object({
      n: z.string(),
      t: z.literal(4),
      v: z.number(),
    }),
    z.object({
      n: z.string(),
      t: z.literal(5),
      v: z.boolean(),
    }),
    z.object({
      n: z.string(),
      t: z.literal(6),
      v: z.tuple([z.number(), z.number()]),
    }),
  ]),
} as const;

export const yamlSchemaItemTypeToInternalItemTypeConverter = {
  ...({
    text: 1,
    label: 2,
    title: 3,
  } as const),
  ...({
    rating: 4,
  } as const),
  ...({
    checkBox: 5,
  } as const),
  ...({
    ratingRatio: 6,
  } as const),
} as const;
