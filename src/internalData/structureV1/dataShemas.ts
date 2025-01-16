import { z } from "zod";
import { ListItemPropertyV1ZodValidatorGen } from "../../misc/supportStructures";

export const listItemDataKeyV1 = (listKey: string, itemId: number) =>
  `${listKey}i${itemId}`;

export const listItemPropertyDataKeyV1 = (itemKey: string, propId: number) =>
  `${itemKey}p${propId}`;

export const filterItemPropertyKeysByItemKey = (
  itemKey: string,
  keys: string[],
) => keys.filter((key) => key.includes(itemKey));

export const filterItemKeysByListKey = (listKey: string, keys: string[]) =>
  keys.filter((key) => key.includes(listKey));

export const listDataShapeV1ZodValidator = z.object({
  v: z.literal("1"),
  n: z.string(),
  c: z.number().refine((num) => num >= 0),
  l: z.number().refine((num) => num >= 0),
});

export const listItemDataShapeV1ZodValidator = z.object({
  c: z.number().refine((num) => num >= 0),
  l: z.number().refine((num) => num >= 0),
});

export const listItemPropertyDataShapeV1ZodValidator =
  ListItemPropertyV1ZodValidatorGen.internal;
