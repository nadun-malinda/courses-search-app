"use server";

import { createClient } from "@/utils/superbase/server";
import { normalizeQueryString } from "@/utils/url";

export async function saveSearch(queryString: string): Promise<{
  success: boolean | null;
  message: string;
}> {
  const supabase = await createClient();
  const normalisedQueryString = normalizeQueryString(queryString);

  try {
    const { data: exisitingSearch, error: checkError } = await supabase
      .from("saved_searches")
      .select("Id")
      .eq("SearchQuery", normalisedQueryString)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // Handle unexpected Supabase errors
      throw new Error(checkError.message);
    }

    if (exisitingSearch) {
      return { success: false, message: "Search already saved" };
    }

    const { error: insertError } = await supabase
      .from("saved_searches")
      .insert([{ SearchQuery: normalisedQueryString }]);

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { success: true, message: "Search saved successfully" };
  } catch (error) {
    console.error("Failed to save search:", error);
    return { success: false, message: "Failed to save search" };
  }
}
