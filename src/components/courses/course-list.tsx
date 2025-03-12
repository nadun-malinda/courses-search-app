import { Course } from "@/types/courses";
import { CourseCard } from "./course-card";

interface CourseListProps {
  courses: Course[];
}

export async function CourseList({ courses }: CourseListProps) {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.CourseId} course={course} />
      ))}
    </div>
  );
}
