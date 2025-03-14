import { Course } from "@/types/courses";
import { CourseCard } from "./course-card";

interface CourseListProps {
  courses: Course[];
}

export async function CourseList({ courses }: CourseListProps) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.CourseId} course={course} />
      ))}
    </div>
  );
}
