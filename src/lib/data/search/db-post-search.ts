import { createClient } from "@/utils/superbase/server";

/**
 * Inserts a new search query into the 'saved_searches' table in Supabase.
 *
 * @param {string} queryString - The search query to be inserted into the 'saved_searches' table.
 * @returns {Promise<boolean>} - Returns `true` if the insert is successful.
 * @throws {Error} - Throws an error if there's an issue with the insertion process.
 */
export async function dbPostSearch(queryString: string): Promise<boolean> {
  const supabase = await createClient();

  // Attempt to insert the new search query into the 'saved_searches' table
  const { error } = await supabase
    .from("saved_searches")
    .insert([{ SearchQuery: queryString }]);

  // Handle any error during the insertion process
  if (error) {
    throw new Error(error.message); // If there's an error during insert
  }

  return true; // Return true if insertion is successful
}
