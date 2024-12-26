import { ListYamlSchemaV1 } from "../loaders/loaderV1/fileSchema";

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

export interface AllListsDataShapeV1 {
  v: "1";
  c: number;
  l: number;
}

export interface ListDataShapeV1 {
  v: "1";
  n: string;
  c: number;
  l: number;
}

export interface ListItemDataShapeV1 {
  c: number;
  l: number;
}

export const JsonSchemaItemTypeToInternalItemTypeConverter = {
  text: 1,
  label: 2,
  title: 3,
  rating: 4,
  checkBox: 5,
  ratingRatio: 6,
} as const;

export type ConvertItemJsonSchemaToInternalShapeV1<T> = T extends {
  propName: string;
  propType: infer U;
  propValue: infer V;
}
  ? U extends ListYamlSchemaV1["main"][0]["properties"][0]["propertyType"]
    ? {
        n: string;
        t: (typeof JsonSchemaItemTypeToInternalItemTypeConverter)[U];
        v: V;
      }
    : never
  : never;

export type ListItemPropertyDataShapeV1 =
  ConvertItemJsonSchemaToInternalShapeV1<
    ListYamlSchemaV1["main"][0]["properties"][0]
  >;
