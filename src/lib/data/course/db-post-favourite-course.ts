import { FavouriteCourseSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function dbPostFavouriteCourse(courseId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favourite_courses")
    .insert([{ CourseId: courseId }]).select(`*, 
      CoursesTable: courses (CourseName, InstituteName, Category, DeliveryMethod, Location, Language, StartDate, Favorites: favourite_courses (Id))`);

  if (error) {
    throw new Error(error.message); // If there's an error during insert
  }

  const parsed = z.array(FavouriteCourseSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid favourite courses data");
  }

  revalidateTag("courses");
  return parsed.data;
}
