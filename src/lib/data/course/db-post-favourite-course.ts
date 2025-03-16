import { FavouriteCourseSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { z } from "zod";

/**
 * Adds a course to the favourite list.
 *
 * @param {string} courseId - The ID of the course to add as a favourite.
 * @returns {Promise<Array>} - The updated list of favourite courses.
 * @throws {Error} - Throws an error if insertion fails or data validation is unsuccessful.
 */
export async function dbPostFavouriteCourse(courseId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("favourite_courses")
    .insert([{ CourseId: courseId }])
    .select(
      `*, 
      CoursesTable: courses (
        CourseName, 
        InstituteName, 
        Category, 
        DeliveryMethod, 
        Location, 
        Language, 
        StartDate, 
        Favorites: favourite_courses (Id)
      )`
    );

  if (error) {
    throw new Error(`Failed to add favourite course: ${error.message}`);
  }

  const parsedResult = z.array(FavouriteCourseSchema).safeParse(data);
  if (!parsedResult.success) {
    throw new Error("Invalid favourite courses data");
  }

  return parsedResult.data;
}
