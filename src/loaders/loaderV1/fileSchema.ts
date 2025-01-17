import { z } from "zod";
import { ListItemPropertyV1ZodValidatorGen } from "../../misc/supportStructures";

export const ListV1ZodValidator = z.object({
  version: z.literal("1"),
  main: z.array(
    z.object({
      properties: z.array(ListItemPropertyV1ZodValidatorGen.yaml),
    }),
  ),
});

export const emptyListV1 = {
  version: "1",
  main: [],
} as z.infer<typeof ListV1ZodValidator>;
