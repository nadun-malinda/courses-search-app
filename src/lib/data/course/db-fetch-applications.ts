import { CourseApplicationSchema } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";

export const dbFetchApplications = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("applications").select(
      `*, 
          CoursesTable: courses (CourseName, InstituteName, Category, DeliveryMethod, Location, Language, StartDate)`
    );

    if (error) {
      throw new Error(`Failed to fetch applications: ${error.message}`);
    }

    const parsed = z.array(CourseApplicationSchema).safeParse(data);
    if (!parsed.success) {
      throw new Error("Invalid course application data");
    }

    return parsed.data;
  },
  ["applications"],
  { tags: ["applications"] }
);
