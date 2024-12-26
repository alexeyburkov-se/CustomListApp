import { ListLoadErrors, ListLoadResultType } from "../mainLoader";
import { ZodValidationListV1 } from "./fileSchema";

export const loadListV1 = (data: unknown): ListLoadResultType => {
  const result = ZodValidationListV1.safeParse(data);
  if (!result.success) {
    // todo log errors
    return { success: false, result: ListLoadErrors.InvalidFileSchema };
  }
  // todo processing
  return { success: true, result: "list1" };
};
