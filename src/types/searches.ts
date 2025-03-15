import { z } from "zod";

/**
 * Schema for a search record.
 */
export const SearchesSchema = z.object({
  Id: z.string(),
  SearchQuery: z.string(),
  CreatedAt: z.string(),
});

/**
 * Schema for a saved search ID.
 */
export const SavedSearchIdSchema = z.object({
  Id: z.string(),
});

/**
 * Type for a search record.
 */
export type Searches = z.infer<typeof SearchesSchema>;
