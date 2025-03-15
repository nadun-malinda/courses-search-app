"use server";

import { z } from "zod";
import { dbDeleteSavedSearch } from "@/lib/data/search/db-delete-saved-search";
import { revalidateTag } from "next/cache";

const SearchIdSchema = z
  .string()
  .min(1, "Search ID must be a non-empty string.");

export async function deleteSearchAction(
  searchId: string
): Promise<{ success: boolean | null; message: string }> {
  try {
    SearchIdSchema.parse(searchId);
  } catch {
    return { success: false, message: "Invalid search ID." };
  }

  try {
    await dbDeleteSavedSearch(searchId);

    // revalidate "saved_searches" cache and refetch
    revalidateTag("saved_searches");
    return { success: true, message: "Saved search deleted successfully." };
  } catch (error) {
    console.error("Failed to delete saved search: ", error);
    return { success: false, message: "Failed to delete saved search." };
  }
}
