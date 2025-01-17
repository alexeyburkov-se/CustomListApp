import { z } from "zod";
import { ListLoadErrors, ListLoadResultType } from "../mainLoader";
import { ListV1ZodValidator } from "./fileSchema";

export type ListDataV1Type = z.infer<typeof ListV1ZodValidator>;

export const loadListV1 = (data: unknown): ListLoadResultType<ListDataV1Type> => {
  const result = ListV1ZodValidator.safeParse(data);
  if (!result.success) {
    // todo log errors
    return { success: false, result: ListLoadErrors.InvalidFileSchema };
  }
  // todo processing
  return { success: true, result: result.data };
};
