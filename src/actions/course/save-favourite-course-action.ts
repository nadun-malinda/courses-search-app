import { dbPostFavouriteCourse } from "@/lib/data/course/db-post-favourite-course";
import { revalidateTag } from "next/cache";

/**
 * Adds a course to the user's favorite list.
 *
 * @param {string} courseId - The unique ID of the course.
 * @returns {Promise<{ success: boolean | null; message: string }>} The result of the operation.
 */
export async function saveFavouriteCourseAction(
  courseId: string
): Promise<{ success: boolean | null; message: string }> {
  try {
    await dbPostFavouriteCourse(courseId);

    // revalidate "courses" cache and refetch
    revalidateTag("courses");
    return {
      success: true,
      message: "Course added to favorites successfully.",
    };
  } catch (error) {
    console.error("Error saving favorite course:", error);
    return {
      success: false,
      message: `Failed to save favorite course: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
