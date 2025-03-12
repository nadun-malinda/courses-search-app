import { z } from "zod";

export const QueryParamsSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
});

export type QueryParams = z.infer<typeof QueryParamsSchema>;
