import { load } from "js-yaml";
import { BaseListShape, ListTypeV1 as ListShapeV1 } from "./listShape";
import { v4 as randomUuid } from "uuid";

export enum ListLoadResult {
  Success,
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
      result: ListLoadResult;
    };

const loadListV1 = (data: ListShapeV1): ListLoadResultType => {
  return { success: true, result: randomUuid() };
};

export const loadList = async (file: File): Promise<ListLoadResultType> => {
  const data = await file.text().then((str) => load(str) as BaseListShape); // todo handle all errors
  switch (data.version) {
    case "1.0.0":
      return loadListV1(data as ListShapeV1);
    default:
      return { success: false, result: ListLoadResult.UnknownVersion };
  }
};
