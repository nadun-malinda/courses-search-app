"use server";

import { saveFavouriteCourseAction } from "./save-favourite-course-action";
import { deleteFavouriteCourseAction } from "./delete-favourite-course-action";

/**
 * Toggles the favorite state of a course.
 *
 * @param {Object} params - The parameters for toggling favorite status.
 * @param {boolean} params.isSave - Whether to save (true) or remove (false) the favorite course.
 * @param {string} params.courseId - The unique ID of the course.
 * @returns {Promise<{ success: boolean | null; message: string }>} The result of the toggle action.
 */
export async function toggleFavouriteCourseAction({
  isSave,
  courseId,
}: {
  isSave: boolean;
  courseId: string;
}): Promise<{ success: boolean | null; message: string }> {
  return isSave
    ? saveFavouriteCourseAction(courseId)
    : deleteFavouriteCourseAction(courseId);
}
