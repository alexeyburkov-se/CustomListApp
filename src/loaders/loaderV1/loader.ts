import { z } from "zod";
import { ListLoadErrors, ListLoadResultType, ListType } from "../mainLoader";
import { ListV1ZodValidator } from "./fileSchema";

const V1ToLatest = (old: z.infer<typeof ListV1ZodValidator>): ListType => old;

export const loadListV1 = (data: unknown): ListLoadResultType<ListType> => {
  const result = ListV1ZodValidator.safeParse(data);
  if (!result.success) {
    // todo log errors
    return { success: false, result: ListLoadErrors.InvalidFileSchema };
  }
  // todo processing
  return { success: true, result: V1ToLatest(result.data) };
};
