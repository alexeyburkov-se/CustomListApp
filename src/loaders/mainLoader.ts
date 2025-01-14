import { load } from "js-yaml";
import { BaseListYamlSchemaZodValidator } from "./baseSchemas";
import { createNewList } from "../internalData/creationFunctions";
import { loadListV1 } from "./loaderV1/loader";

export enum ListLoadErrors {
  Error,
  UnknownSchemaVersion,
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

const hasLoaderForVersion = (
  version: string
): version is keyof typeof loaderMap => {
  return version in loaderMap;
};

export const loadList = async (file?: File): Promise<ListLoadResultType> => {
  if (!file) {
    return { success: true, result: createNewList() };
  }
  const validationResult = await file
    .text()
    .then((text) => load(text))
    .then((data) => BaseListYamlSchemaZodValidator.safeParseAsync(data)); // todo handle all errors
  if (!validationResult.success) {
    return { success: false, result: ListLoadErrors.InvalidFileSchema };
  }
  if (!hasLoaderForVersion(validationResult.data.version)) {
    return { success: false, result: ListLoadErrors.UnknownSchemaVersion };
  }
  return loaderMap[validationResult.data.version](validationResult.data);
};
