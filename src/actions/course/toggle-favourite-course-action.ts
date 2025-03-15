"use server";

import { saveFavouriteCourseAction } from "./save-favourite-course-action";
import { deleteFavouriteCourseAction } from "./delete-favourite-course-action";

/**
 * Toggles the favorite state of a course.
 *
 * @param {Object} params - The parameters for toggling favorite status.
 * @param {boolean} params.isFavorite - Whether to save (true) or remove (false) the favorite course.
 * @param {string} params.courseId - The unique ID of the course.
 * @returns {Promise<{ success: boolean | null; message: string }>} The result of the toggle action.
 */
export async function toggleFavouriteCourseAction({
  isFavorite,
  courseId,
}: {
  isFavorite: boolean;
  courseId: string;
}): Promise<{ success: boolean | null; message: string }> {
  return isFavorite
    ? saveFavouriteCourseAction(courseId)
    : deleteFavouriteCourseAction(courseId);
}
