import { z } from "zod";

export const allListsDataKey = () => "a";

export const listDataKey = (listId: number) => `l${listId}`;

export const listItemDataKey = (listKey: string, itemId: number) =>
  `${listKey}i${itemId}`;

export const listItemPropertyDataKey = (itemKey: string, propId: number) =>
  `${itemKey}p${propId}`;

export const filterItemPropertyKeysByItemKey = (
  itemKey: string,
  keys: string[]
) => keys.filter((v) => v.includes(itemKey));

export const filterItemKeysByListKey = (listKey: string, keys: string[]) =>
  keys.filter((v) => v.includes(listKey));

export const ZodValidationAllListsDataShapeV1 = z.object({
  v: z.literal("1"),
  c: z.number().refine((num) => num >= 0),
  l: z.number().refine((num) => num >= 0),
});

export const ZodValidationListDataShapeV1 = z.object({
  v: z.literal("1"),
  n: z.string(),
  c: z.number().refine((num) => num >= 0),
  l: z.number().refine((num) => num >= 0),
});

export const ZodValidationListItemDataShapeV1 = z.object({
  c: z.number().refine((num) => num >= 0),
  l: z.number().refine((num) => num >= 0),
});

export const YamlSchemaItemTypeToInternalItemTypeConverter = {
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

export const ZodValidationListItemPropertyDataShapeV1 = z.union([
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
]);
