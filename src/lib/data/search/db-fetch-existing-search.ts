import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";

/**
 * Fetches an existing search from the 'saved_searches' table in Supabase.
 *
 * @param {string} queryString - The search query to look for in the 'saved_searches' table.
 * @returns {Promise<{ Id: string } | null>} - The ID of the found search query or null if no match is found.
 * @throws {Error} - Throws an error if there's an unexpected issue with the Supabase request.
 */
export const dbFetchExistingSearch = unstable_cache(
  async (queryString: string) => {
    const supabase = await createClient();

    // Query the 'saved_searches' table for the given search query
    const { data, error } = await supabase
      .from("saved_searches")
      .select("Id")
      .eq("SearchQuery", queryString)
      .single();

    // Handle Supabase errors
    if (error && error.code !== "PGRST116") {
      throw new Error(error.message); // Unexpected Supabase error
    }

    return data;
  },
  ["saved_searches"], // Cache key (invalidates when 'saved_searches' changes)
  { tags: ["saved_searches"] } // Cache invalidation tags
);
