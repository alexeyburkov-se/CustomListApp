import { ListLoadErrors, ListLoadResultType } from "../mainLoader";
import { ListV1ZodValidator } from "./fileSchema";

export const loadListV1 = (data: unknown): ListLoadResultType => {
  const result = ListV1ZodValidator.safeParse(data);
  if (!result.success) {
    // todo log errors
    return { success: false, result: ListLoadErrors.InvalidFileSchema };
  }
  // todo processing
  return { success: true, result: "list1" };
};
