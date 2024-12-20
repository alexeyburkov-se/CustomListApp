import { BaseListJsonSchema } from "./fileSchemas";
import { ListLoadResultType } from "./mainLoader";

const validateListSchemaV1 = (data: unknown): data is BaseListJsonSchema =>
    typeof data == "object" && data != null && "version" in data;

export const loadListV1 = (data: BaseListJsonSchema): ListLoadResultType => {
// todo validation into ListJsonSchemaV1
// todo processing
return { success: true, result: "list1" };
};