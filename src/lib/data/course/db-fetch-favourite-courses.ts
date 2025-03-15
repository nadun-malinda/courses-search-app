import { FavouriteCourseSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";

export const dbFetchFavouriteCourses = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("favourite_courses").select(
      `*, 
      CoursesTable: courses (CourseName, InstituteName, Category, DeliveryMethod, Location, Language, StartDate, Favorites: favourite_courses (Id))`
    );

    if (error) {
      throw new Error(`Failed to fetch favourite courses: ${error.message}`);
    }

    const parsed = z.array(FavouriteCourseSchema).safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid favourite courses data");
    }

    return parsed.data.map((favCourses) => ({
      ...favCourses,
      ...favCourses.CoursesTable,
      IsFavorite: favCourses.CoursesTable
        ? favCourses.CoursesTable.Favorites.length > 0
        : false,
    }));
  },
  ["favourite_courses"],
  { tags: ["favourite_courses"] }
);
