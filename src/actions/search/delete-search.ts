"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { deleteSavedSearch } from "@/lib/data/search/delete-saved-search";

const SearchIdSchema = z
  .string()
  .min(1, "Search ID must be a non-empty string.");

export async function deleteSearch(
  searchId: string
): Promise<{ success: boolean | null; message: string }> {
  try {
    SearchIdSchema.parse(searchId);
  } catch {
    return { success: false, message: "Invalid search ID." };
  }

  try {
    await deleteSavedSearch(searchId);

    // revalidatePath("/");
    revalidateTag("saved_searches_tag");
    return { success: true, message: "Saved search deleted successfully." };
  } catch (error) {
    console.error("Failed to delete saved search: ", error);
    return { success: false, message: "Failed to delete saved search." };
  }
}
