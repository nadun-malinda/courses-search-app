import { CourseSchema } from "@/types/courses";
import { QueryParams } from "@/types/filters";
import { createClient } from "@/utils/superbase/server";
import { z } from "zod";
import { unstable_cache } from "next/cache";
import { PAGE_LIMIT } from "@/lib/contstants";

/**
 * Fetches a paginated list of courses from Supabase based on query parameters.
 * Returns an empty array if the requested page is out of range.
 *
 * @param {QueryParams} urlSearchParams - Query parameters for filtering courses.
 * @param {number} page - The page number to fetch (default: 1).
 * @param {number} limit - The number of items per page (default: 10).
 * @returns {Promise<{ courses: CourseSchema[], totalCount: number }>} The fetched courses and total count.
 * @throws {Error} If Supabase query fails or the fetched data is invalid.
 */
export const dbFetchCourses = unstable_cache(
  async (
    urlSearchParams: QueryParams,
    page: number = 1,
    limit: number = PAGE_LIMIT
  ) => {
    const { q, category, location } = urlSearchParams;
    const supabase = await createClient();

    // Ensure valid pagination inputs
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);

    // Fetch total count first to validate the requested range
    let countQuery = supabase
      .from("courses")
      .select("*", { count: "exact", head: true });

    if (q) countQuery = countQuery.ilike("CourseName", `%${q}%`);
    if (category) countQuery = countQuery.in("Category", category.split(","));
    if (location) countQuery = countQuery.in("Location", location.split(","));

    const { count, error: countError } = await countQuery;
    if (countError) {
      throw new Error(`Failed to fetch course count: ${countError.message}`);
    }

    // If the requested page is beyond the available count, return empty
    if (!count || (safePage - 1) * safeLimit >= count) {
      return { courses: [], totalCount: count };
    }

    // Calculate range for pagination
    const from = (safePage - 1) * safeLimit;
    const to = Math.min(from + safeLimit - 1, count - 1);

    // Query courses with pagination
    let query = supabase
      .from("courses")
      .select(
        `
      *,
      Favorites: favourite_courses (Id)
    `,
        { count: "exact" }
      )
      .range(from, to);

    if (q) query = query.ilike("CourseName", `%${q}%`);
    if (category) query = query.in("Category", category.split(","));
    if (location) query = query.in("Location", location.split(","));

    const { data, error } = await query;
    if (error) {
      throw new Error(`Failed to fetch courses: ${error.message}`);
    }

    const parsed = z.array(CourseSchema).safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid courses data");
    }

    return {
      courses: parsed.data.map((course) => ({
        ...course,
        IsFavorite: course.Favorites.length > 0,
      })),
      totalCount: count,
    };
  },
  ["courses"],
  { tags: ["courses"], revalidate: 60 }
);
