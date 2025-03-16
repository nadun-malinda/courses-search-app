import { CourseApplicationSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";

/**
 * Fetches a single course application from the database and caches the result.
 *
 * @param {string} applicationId - The ID of the application to fetch.
 * @returns {Promise<object>} - The course application object.
 * @throws {Error} - Throws an error if the fetch fails or data validation is unsuccessful.
 */
export const dbFetchApplication = unstable_cache(
  async (applicationId: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("applications")
      .select(
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
      )
      .eq("Id", applicationId) // Ensure correct casing for DB column
      .single(); // Fetch a single result directly

    if (error) {
      throw new Error(`Failed to fetch application: ${error.message}`);
    }

    const parsedResult = CourseApplicationSchema.safeParse(data);
    if (!parsedResult.success) {
      throw new Error("Invalid course application data");
    }

    return parsedResult.data;
  }
);
