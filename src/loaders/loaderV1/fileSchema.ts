import { z } from "zod";
import {
  ZodValidationBooleanPropTypes,
  ZodValidationNumberPropTypes,
  ZodValidationRatioPropTypes,
  ZodValidationStringPropTypes,
} from "../baseSchemas";

export const ZodValidationListV1 = z.object({
  version: z.literal("1"),
  main: z.array(
    z.object({
      properties: z.array(
        z.union([
          z.object({
            propertyName: z.string(),
            propertyType: ZodValidationStringPropTypes,
            propertyValue: z.string(),
          }),
          z.object({
            propertyName: z.string(),
            propertyType: ZodValidationBooleanPropTypes,
            propertyValue: z.boolean(),
          }),
          z.object({
            propertyName: z.string(),
            propertyType: ZodValidationNumberPropTypes,
            propertyValue: z.number(),
          }),
          z.object({
            propertyName: z.string(),
            propertyType: ZodValidationRatioPropTypes,
            propertyValue: z.tuple([z.number(), z.number()]),
          }),
        ])
      ),
    })
  ),
});

export type ListYamlSchemaV1 = z.infer<typeof ZodValidationListV1>;
