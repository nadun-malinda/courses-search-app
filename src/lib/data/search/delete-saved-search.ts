import { SearchesSchema } from "@/types/searches";
import { createClient } from "@/utils/superbase/server";
import { z } from "zod";

export async function deleteSavedSearch(searchId: string) {
  const supabase = await createClient();

  const { error, data } = await supabase
    .from("saved_searches")
    .delete()
    .eq("Id", searchId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  const parsed = z.array(SearchesSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid search data");
  }

  return parsed.data;
}
