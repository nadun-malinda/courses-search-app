import { createClient } from "@/utils/superbase/server";

export async function dbPostSearch(queryString: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("saved_searches")
    .insert([{ SearchQuery: queryString }]);

  if (error) {
    throw new Error(error.message); // If there's an error during insert
  }

  return true;
}
