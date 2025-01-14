import { z } from "zod";

export const allListsDataKeyV1 = () => "a";

export const allListsDataShapeV1ZodValidator = z.object({
  c: z.number().refine((num) => num >= 0),
  l: z.number().refine((num) => num >= 0),
});

export const defaultDataV1 = '{"c":0,"l":0}';

export const listDataKeyV1 = (listId: number) => `l${listId}`;

export const filterListKeysV1 = (keys: string[]) =>
  keys.filter((key) => /^l[1-9]\d*$/.test(key));
