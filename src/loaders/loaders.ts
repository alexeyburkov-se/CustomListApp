import { load } from "js-yaml";
import { BaseListJsonSchema, ListJsonSchemaV1 } from "./fileSchemas";
import { createNewList } from "../internalData/creationFunctions";

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

const loadListV1 = (data: ListJsonSchemaV1): ListLoadResultType => {
  return { success: true, result: "list1" };
};

const createEmptyList = (): ListLoadResultType => {
  return { success: true, result: createNewList() };
};

export const loadList = async (
  file: File | null,
): Promise<ListLoadResultType> => {
  if (!file) {
    return createEmptyList();
  }
  const data = await file.text().then((str) => load(str) as BaseListJsonSchema); // todo handle all errors and semantic validation
  switch (data.version) {
    case "1.0.0":
      return loadListV1(data as ListJsonSchemaV1);
    default:
      return { success: false, result: ListLoadErrors.UnknownVersion };
  }
};
