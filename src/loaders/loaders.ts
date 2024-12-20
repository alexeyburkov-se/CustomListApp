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

const loaderMap = {
  "1": loadListV1,
} as const;

const hasLoaderForVersion = (ver: string): ver is keyof typeof loaderMap => {
  return ver in loaderMap;
};

export const loadList = async (file?: File): Promise<ListLoadResultType> => {
  if (!file) {
    return createEmptyList();
  }
  const data = await file.text().then((str) => load(str) as BaseListJsonSchema); // todo handle all errors and semantic validation of schema
  if (!hasLoaderForVersion(data.version)) {
    return { success: false, result: ListLoadErrors.UnknownVersion };
  }
  return loaderMap[data.version](data);
};
