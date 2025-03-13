"use server";

import { createClient, SupabaseClientType } from "@/utils/superbase/server";
import { normalizeQueryString } from "@/utils/url";

/**
 * Saves a search query to the database if it doesn't already exist.
 *
 * @param {string} queryString - The raw query string to normalize and save.
 * @returns {Promise<{ success: boolean; message: string }>} - The result of the save operation.
 */
export async function saveSearch(queryString: string): Promise<{
  success: boolean | null;
  message: string;
}> {
  const supabase = await createClient();
  const normalizedQueryString = normalizeQueryString(queryString);

  try {
    // Check if the search query already exists
    const existingSearch = await checkExistingSearch(
      supabase,
      normalizedQueryString
    );
    if (existingSearch) {
      return { success: false, message: "Search already saved" };
    }

    // Insert the search query into the database
    const insertSuccess = await insertSearch(supabase, normalizedQueryString);
    if (insertSuccess) {
      return { success: true, message: "Search saved successfully" };
    }

    // If insertion failed, return failure message
    return { success: false, message: "Failed to save search" };
  } catch (error) {
    console.error("Failed to save search:", error);
    return { success: false, message: "Failed to save search" };
  }
}

/**
 * Checks if a given search query already exists in the database.
 *
 * @param {SupabaseClient} supabase - The Supabase client instance.
 * @param {string} queryString - The normalized search query to check.
 * @returns {Promise<boolean>} - Whether the search query already exists.
 */
async function checkExistingSearch(
  supabase: SupabaseClientType,
  queryString: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("saved_searches")
    .select("Id")
    .eq("SearchQuery", queryString)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message); // Unexpected Supabase error
  }

  return Boolean(data); // Return true if the search exists
}

/**
 * Inserts a new search query into the database.
 *
 * @param {SupabaseClient} supabase - The Supabase client instance.
 * @param {string} queryString - The normalized search query to insert.
 * @returns {Promise<boolean>} - Whether the insert operation was successful.
 */
async function insertSearch(
  supabase: SupabaseClientType,
  queryString: string
): Promise<boolean> {
  const { error } = await supabase
    .from("saved_searches")
    .insert([{ SearchQuery: queryString }]);

  if (error) {
    throw new Error(error.message); // If there's an error during insert
  }

  return true; // Return success if no error
}
