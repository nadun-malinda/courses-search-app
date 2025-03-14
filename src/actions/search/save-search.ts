"use server";

import { fetchExistingSearch } from "@/lib/data/search/fetch-existing-search";
import { postSearch } from "@/lib/data/search/post-search";
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
  const normalizedQueryString = normalizeQueryString(queryString);

  try {
    // Check if the search query already exists
    const existingSearch = await fetchExistingSearch(normalizedQueryString);
    if (Boolean(existingSearch)) {
      return { success: false, message: "Search already saved" };
    }

    // Insert the search query into the database
    const insertSuccess = await postSearch(normalizedQueryString);
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
