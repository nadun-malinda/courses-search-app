import { CourseApplicationAction } from "@/types/courses";
import { createClient } from "@/utils/superbase/server";

/**
 * Posts a course application to the database.
 *
 * @param {CourseApplicationAction} formData - The form data containing course application details.
 * @returns {Promise<Object>} - The inserted application data.
 * @throws {Error} - Throws an error if insertion fails or if the user has already applied.
 */
export async function dbPostApplication({
  courseId,
  firstName,
  lastName,
  email,
}: CourseApplicationAction) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        CourseId: courseId,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
      },
    ])
    .select();

  if (error) {
    if (error.code === "23505") {
      throw new Error("You have already applied for this course!");
    }
    throw new Error(`Failed to apply: ${error.message}`);
  }

  return data;
}
