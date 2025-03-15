import { SearchesSchema } from "@/types/searches";
import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";

/**
 * Fetches saved searches from the Supabase database.
 * Uses caching to optimize repeated queries.
 *
 * @returns {Promise<Array<SearchesSchema>>} A promise resolving to an array of validated saved searches.
 * @throws {Error} If the fetched data is invalid or if Supabase query fails.
 */
export const dbFetchSavedSearches = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("saved_searches").select();

    if (error) {
      throw new Error(`Failed to fetch saved searches: ${error.message}`);
    }

    const parsed = z.array(SearchesSchema).safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid saved searches data");
    }

    return parsed.data;
  },
  ["saved_searches"],
  { tags: ["saved_searches"] }
);
