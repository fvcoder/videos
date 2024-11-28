import { z } from "zod";

export const baseSchema = z.object({
    isProd: z.boolean(),
})