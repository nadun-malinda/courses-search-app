"use server";

import { z } from "zod";
import { createClient } from "@/utils/superbase/server";
import { revalidateTag } from "next/cache";

const SearchIdSchema = z
  .string()
  .min(1, "Search ID must be a non-empty string.");

export async function deleteSavedSearch(
  searchId: string
): Promise<{ success: boolean | null; message: string }> {
  const supabase = await createClient();

  try {
    SearchIdSchema.parse(searchId);
  } catch {
    return { success: false, message: "Invalid search ID." };
  }

  try {
    const { error } = await supabase
      .from("saved_searches")
      .delete()
      .eq("Id", searchId);

    if (error) {
      throw new Error(error.message);
    }

    // revalidatePath("/");
    revalidateTag("saved_searches_tag");
    return { success: true, message: "Saved search deleted successfully." };
  } catch (error) {
    console.error("Failed to delete saved search: ", error);
    return { success: false, message: "Failed to delete saved search." };
  }
}
