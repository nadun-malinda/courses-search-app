import { z } from "zod";

/**
 * Schema for query parameters used in course search.
 */
export const QueryParamsSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
});

/**
 * Type for query parameters used in course search.
 */
export type QueryParams = z.infer<typeof QueryParamsSchema>;
