"use server";

import { postFavouriteCourse } from "@/lib/data/course/post-favourite-course";

export async function saveFavouriteCourse(
  courseId: string
): Promise<{ success: boolean | null; message: string }> {
  try {
    await postFavouriteCourse(courseId);
    return { success: true, message: "Saved favourite course successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to save favourite course" };
  }
}
