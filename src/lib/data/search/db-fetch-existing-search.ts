import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";

export const dbFetchExistingSearch = unstable_cache(
  async (queryString: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("saved_searches")
      .select("Id")
      .eq("SearchQuery", queryString)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error(error.message); // Unexpected Supabase error
    }

    return data;
  },
  ["saved_searches"],
  { tags: ["saved_searches"] }
);
