"use server";

import { dbPostApplication } from "@/lib/data/course/db-post-application";
import { CourseApplicationAction } from "@/types/courses";

/**
 * Submits a course application.
 *
 * @param {CourseApplicationAction} formData - The form data containing course application details.
 * @returns {Promise<{ success: boolean; message: string }>} The result of the submission.
 */
export async function submitApplicationAction(
  formData: CourseApplicationAction
): Promise<{ success: boolean; message: string }> {
  try {
    await dbPostApplication(formData);

    return {
      success: true,
      message: "Course application submitted successfully.",
    };
  } catch (error) {
    console.error("Error submitting course application:", error);

    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
