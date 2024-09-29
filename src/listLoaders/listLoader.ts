import { load } from "js-yaml";
import { BaseListShape, ListTypeV1 as ListShapeV1 } from "./listShape";

export enum ListLoadErrors {
  Error,
  UnknownVersion,
}

export type ListLoadResultType =
  | {
      success: true;
      result: string;
    }
  | {
      success: false;
      result: ListLoadErrors;
    };

const loadListV1 = (data: ListShapeV1): ListLoadResultType => {
  return { success: true, result: "list1" };
};

const createEmptyList = (): ListLoadResultType => {
  return { success: true, result: "list1" };
};

export const loadList = async (
  file: File | null
): Promise<ListLoadResultType> => {
  if (!file) {
    return createEmptyList();
  }
  const data = await file.text().then((str) => load(str) as BaseListShape); // todo handle all errors
  switch (data.version) {
    case "1.0.0":
      return loadListV1(data as ListShapeV1);
    default:
      return { success: false, result: ListLoadErrors.UnknownVersion };
  }
};
