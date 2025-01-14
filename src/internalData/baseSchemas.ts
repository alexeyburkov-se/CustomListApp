import { z } from "zod";

export const mainStructureVersionKey = () => "v";

export const mainStructureVersionZodValidator = z.literal("1");
