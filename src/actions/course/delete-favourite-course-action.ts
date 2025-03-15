import { dbDeleteFavouriteCourse } from "@/lib/data/course/db-delete-favourite-course";
import { revalidateTag } from "next/cache";

/**
 * Removes a course from the user's favorite list.
 *
 * @param {string} courseId - The unique ID of the course.
 * @returns {Promise<{ success: boolean | null; message: string }>} The result of the operation.
 */
export async function deleteFavouriteCourseAction(
  courseId: string
): Promise<{ success: boolean | null; message: string }> {
  try {
    await dbDeleteFavouriteCourse(courseId);

    // revalidate "courses" cache and refetch
    revalidateTag("courses");
    return {
      success: true,
      message: "Course removed from favorites successfully.",
    };
  } catch (error) {
    console.error("Error removing favorite course:", error);
    return {
      success: false,
      message: `Failed to remove favorite course: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
