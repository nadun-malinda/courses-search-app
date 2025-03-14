"use server";

import { dbFetchExistingSearch } from "@/lib/data/search/db-fetch-existing-search";
import { dbPostSearch } from "@/lib/data/search/db-post-search";
import { normalizeQueryString } from "@/utils/url";

/**
 * Saves a search query to the database if it doesn't already exist.
 *
 * @param {string} queryString - The raw query string to normalize and save.
 * @returns {Promise<{ success: boolean; message: string }>} - The result of the save operation.
 */
export async function saveSearchAction(queryString: string): Promise<{
  success: boolean | null;
  message: string;
}> {
  const normalizedQueryString = normalizeQueryString(queryString);

  try {
    // Check if the search query already exists
    const existingSearch = await dbFetchExistingSearch(normalizedQueryString);
    if (Boolean(existingSearch)) {
      return { success: false, message: "Search already saved" };
    }

    // Insert the search query into the database
    const insertSuccess = await dbPostSearch(normalizedQueryString);
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
