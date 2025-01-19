import { load } from "js-yaml";
import { BaseListYamlSchemaZodValidator } from "./baseSchemas";
import { loadListV1 } from "./loaderV1/loader";
import { ListV1ZodValidator } from "./loaderV1/fileSchema";
import { z } from "zod";

export enum ListLoadErrors {
  Error,
  UnknownSchemaVersion,
  InvalidFileSchema,
}

export type ListLoadResultType<T> =
  | {
      success: true;
      result: T;
    }
  | {
      success: false;
      result: ListLoadErrors;
    };

const loaderMap = {
  "1": loadListV1,
} as const;

const hasLoaderForVersion = (
  version: string,
): version is keyof typeof loaderMap => {
  return version in loaderMap;
};

export const ListZodValidator = ListV1ZodValidator;
export type ListType = z.infer<typeof ListZodValidator>;
const emptyList = {
  version: "1",
  main: [],
} as ListType;

export const loadList = async (
  file?: File,
): Promise<ListLoadResultType<ListType>> => {
  if (!file) {
    return { success: true, result: emptyList };
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
