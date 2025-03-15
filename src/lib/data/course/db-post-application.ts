import { CourseApplicationAction } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";

/**
 * Posts a course application to the database.
 *
 * @param {CourseApplicationAction} formData - The form data containing course application details.
 * @throws {Error} If there is an error during the insertion.
 */
export async function dbPostApplication({
  courseId,
  firstName,
  lastName,
  email,
}: CourseApplicationAction) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("applications").insert([
    {
      CourseId: courseId,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
    },
  ]);

  if (error) {
    // Check for unique constraint violation
    if (error.code === "23505") {
      throw new Error("You have already applied for this course!");
    }
    throw new Error(error.message); // If there's another error during insert
  }

  return data;
}
