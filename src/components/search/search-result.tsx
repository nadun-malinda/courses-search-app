import { z } from "zod";
import { createClient } from "@/utils/superbase/server";
import { CourseList } from "../courses/course-list";
import { CourseSchema } from "@/types/courses";
import { QueryParams } from "@/types/filters";

export async function SearchResult({
  urlSearchParams,
}: {
  urlSearchParams: QueryParams;
}) {
  const { q, category, location } = urlSearchParams;

  const supabase = await createClient();
  let query = supabase.from("courses").select("*");

  if (q) {
    query = query.ilike("CourseName", `%${q}%`);
  }
  if (category) {
    query = query.in("Category", category.split(","));
  }
  if (location) {
    query = query.in("Location", location.split(","));
  }

  query.limit(10);

  const { data } = await query;
  const parsed = z.array(CourseSchema).safeParse(data);

  if (!parsed.success) {
    return <>Invalid courses data!</>;
  }

  const courses = parsed.data;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center">
        Search Results
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          ({courses.length} courses found)
        </span>
      </h2>
      <CourseList courses={courses} />
    </div>
  );
}
