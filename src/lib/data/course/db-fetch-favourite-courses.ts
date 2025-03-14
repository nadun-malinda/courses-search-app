import { FavouriteCourseSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { cache } from "react";
import { z } from "zod";

export const dbFetchFavouriteCourses = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("favourite_courses").select();

  if (error) {
    throw new Error(`Failed to fetch favourite courses: ${error.message}`);
  }

  const parsed = z.array(FavouriteCourseSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid favourite courses data");
  }

  return parsed.data;
});
