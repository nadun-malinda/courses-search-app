import { z } from "zod";

export const SearchesSchema = z.object({
  Id: z.string(),
  SearchQuery: z.string(),
  CreatedAt: z.string(),
});

export const SavedSearchIdSchema = z.object({
  Id: z.string(),
});

export type Searches = z.infer<typeof SearchesSchema>;
