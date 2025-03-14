import { CourseSchema } from "@/types/courses";
import { QueryParams } from "@/types/filters";
import { createClient } from "@/utils/superbase/server";
import { z } from "zod";
import { cache } from "react";

/**
 * Fetches a list of courses from Supabase based on query parameters.
 * Uses caching to optimize repeated queries.
 *
 * @param {QueryParams} urlSearchParams - The query parameters for filtering courses.
 * @param {string} [urlSearchParams.q] - Search query for course names.
 * @param {string} [urlSearchParams.category] - Comma-separated categories to filter courses.
 * @param {string} [urlSearchParams.location] - Comma-separated locations to filter courses.
 * @returns {Promise<Array<CourseSchema>>} A promise resolving to an array of validated courses.
 * @throws {Error} If the fetched data is invalid or if Supabase query fails.
 */
export const fetchCourses = cache(async (urlSearchParams: QueryParams) => {
  const { q, category, location } = urlSearchParams;
  const supabase = await createClient();

  let query = supabase.from("courses").select("*");

  if (q) query = query.ilike("CourseName", `%${q}%`);
  if (category) query = query.in("Category", category.split(","));
  if (location) query = query.in("Location", location.split(","));

  const { data, error } = await query.limit(10);

  console.log("FETCHING COURSES ...");

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  const parsed = z.array(CourseSchema).safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid courses data");
  }

  return parsed.data;
});
