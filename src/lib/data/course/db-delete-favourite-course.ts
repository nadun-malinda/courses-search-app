import { FavouriteCourseSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { z } from "zod";

/**
 * Deletes a favourite course from the database.
 *
 * @param {string} courseId - The ID of the course to be removed from favourites.
 * @returns {Promise<Array>} - The updated list of favourite courses.
 * @throws {Error} - Throws an error if deletion fails or data validation is unsuccessful.
 */
export async function dbDeleteFavouriteCourse(courseId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("favourite_courses")
    .delete()
    .eq("CourseId", courseId)
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
    throw new Error(`Failed to remove favourite course: ${error.message}`);
  }

  const parsedResult = z.array(FavouriteCourseSchema).safeParse(data);
  if (!parsedResult.success) {
    throw new Error("Invalid favourite courses data");
  }

  return parsedResult.data;
}
