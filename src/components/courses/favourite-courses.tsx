import { dbFetchFavouriteCourses } from "@/lib/data/course/db-fetch-favourite-courses";
import { CourseList } from "@/components/courses/course-list";
import { EmptyResult } from "@/components/empty/empty-result";

export async function FavouriteCourses() {
  const courses = await dbFetchFavouriteCourses();

  return courses.length > 0 ? (
    <CourseList courses={courses} />
  ) : (
    <EmptyResult
      title="No favourite courses yet."
      message="Save your coureses for quick access later."
    />
  );
}
