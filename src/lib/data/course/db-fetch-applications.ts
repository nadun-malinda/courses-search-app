import { CourseApplicationSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";

/**
 * Fetches all course applications from the database and caches the result.
 *
 * @returns {Promise<Array>} - The list of course applications.
 * @throws {Error} - Throws an error if the fetch fails or data validation is unsuccessful.
 */
export const dbFetchApplications = unstable_cache(
  async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.from("applications").select(
      `*, 
        CoursesTable: courses (
          CourseName, 
          InstituteName, 
          Category, 
          DeliveryMethod, 
          Location, 
          Language, 
          StartDate
        )`
    );

    if (error) {
      throw new Error(`Failed to fetch applications: ${error.message}`);
    }

    const parsedResult = z.array(CourseApplicationSchema).safeParse(data);
    if (!parsedResult.success) {
      throw new Error("Invalid course application data");
    }

    return parsedResult.data;
  },
  ["applications"], // Cache key
  { tags: ["applications"] } // Cache tags for invalidation
);
