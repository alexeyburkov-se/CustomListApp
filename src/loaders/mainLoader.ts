import { load } from "js-yaml";
import { BaseListJsonSchema } from "./baseSchemas";
import { createNewList } from "../internalData/creationFunctions";
import { loadListV1 } from "./loaderV1/loader";

export enum ListLoadErrors {
  Error,
  UnknownVersion,
  InvalidFileSchema,
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

const loaderMap = {
  "1": loadListV1,
} as const;

const hasLoaderForVersion = (version: string): version is keyof typeof loaderMap => {
  return version in loaderMap;
};

const validateBaseSchema = (data: unknown): data is BaseListJsonSchema =>
  typeof data == "object" && data != null && "version" in data && typeof data.version == "string";

export const loadList = async (file?: File): Promise<ListLoadResultType> => {
  if (!file) {
    return { success: true, result: createNewList() };
  }
  const data = await file.text().then((str) => load(str)); // todo handle all errors
  if (!validateBaseSchema(data)) {
    return { success: false, result: ListLoadErrors.InvalidFileSchema };
  }
  if (!hasLoaderForVersion(data.version)) {
    return { success: false, result: ListLoadErrors.UnknownVersion };
  }
  return loaderMap[data.version](data);
};
