import { BaseListJsonSchema, ListJsonSchemaV1 } from "../baseSchemas";
import { ListLoadResultType } from "../mainLoader";

const validateListSchemaV1 = (
  data: BaseListJsonSchema
): data is ListJsonSchemaV1 => {
  if (!("main" in data) || !Array.isArray(data.main)) {
    return false;
  }
  data.main
};

export const loadListV1 = (data: BaseListJsonSchema): ListLoadResultType => {
  // todo validation into ListJsonSchemaV1
  // todo processing
  return { success: true, result: "list1" };
};
