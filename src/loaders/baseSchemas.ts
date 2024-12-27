import { z } from "zod";

export const ZodValidationStringPropTypes = z.enum(["text", "label", "title"]);

export const ZodValidationBooleanPropTypes = z.enum(["checkBox"]);

export const ZodValidationNumberPropTypes = z.enum(["rating"]);

export const ZodValidationRatioPropTypes = z.enum(["ratingRatio"]);

export const ZodValidationBaseListYamlSchema = z.object({
  version: z.string(),
});
