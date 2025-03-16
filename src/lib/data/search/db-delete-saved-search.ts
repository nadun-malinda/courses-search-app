import { SearchesSchema } from "@/types/searches";
import { createClient } from "@/utils/superbase/server";
import { z } from "zod";

/**
 * Deletes a saved search from the database.
 *
 * @param {string} searchId - The ID of the saved search to delete.
 * @returns {Promise<Array<SearchesSchema>>} A promise resolving to an array of deleted search records.
 * @throws {Error} If there is an issue deleting the search or if the returned data is invalid.
 */
export async function dbDeleteSavedSearch(searchId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_searches")
    .delete()
    .eq("Id", searchId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  const parsed = z.array(SearchesSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid search data returned after deletion");
  }

  return parsed.data;
}
