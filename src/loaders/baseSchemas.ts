import { z } from "zod";

export const StringPropTypesZodValidator = z.enum(["text", "label", "title"]);

export const BooleanPropTypesZodValidator = z.enum(["checkBox"]);

export const NumberPropTypesZodValidator = z.enum(["rating"]);

export const RatioPropTypesZodValidator = z.enum(["ratingRatio"]);

export const BaseListYamlSchemaZodValidator = z.object({
  version: z.string(),
});
