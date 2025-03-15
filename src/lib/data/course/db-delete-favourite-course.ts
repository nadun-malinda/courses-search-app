import { FavouriteCourseSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function dbDeleteFavouriteCourse(courseId: string) {
  const supabase = await createClient();

  const { error, data } = await supabase
    .from("favourite_courses")
    .delete()
    .eq("CourseId", courseId).select(`*, 
      CoursesTable: courses (CourseName, InstituteName, Category, DeliveryMethod, Location, Language, StartDate, Favorites: favourite_courses (Id))`);

  if (error) {
    throw new Error(`Failed to remove favourite course: ${error.message}`);
  }

  const parsed = z.array(FavouriteCourseSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid favourite courses data");
  }

  revalidateTag("");
  return parsed.data;
}
