import { FavouriteCourseSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";

/**
 * Fetches all favourite courses from the database and caches the result.
 *
 * @returns {Promise<Array>} - The list of favourite courses.
 * @throws {Error} - Throws an error if the fetch fails or data validation is unsuccessful.
 */
export const dbFetchFavouriteCourses = unstable_cache(
  async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.from("favourite_courses").select(
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
      throw new Error(`Failed to fetch favourite courses: ${error.message}`);
    }

    const parsedResult = z.array(FavouriteCourseSchema).safeParse(data);
    if (!parsedResult.success) {
      throw new Error("Invalid favourite courses data");
    }

    return parsedResult.data.map((favCourses) => ({
      ...favCourses,
      ...favCourses.CoursesTable,
      IsFavorite: favCourses.CoursesTable
        ? favCourses.CoursesTable.Favorites.length > 0
        : false,
    }));
  },
  ["favourite_courses"], // Cache key
  { tags: ["favourite_courses"] } // Cache tags for invalidation
);
