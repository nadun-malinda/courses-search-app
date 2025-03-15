"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Course } from "@/types/courses";
import { Heart } from "lucide-react";
import { useState, useOptimistic } from "react";
import { useFormStatus } from "react-dom";
import { toggleFavouriteCourseAction } from "@/actions/course/toggle-favourite-course-action";
import { toast } from "sonner";

/**
 * ToggleFavouriteCourse Component
 *
 * Allows users to mark a course as a favorite or remove it from favorites.
 *
 * @param {Object} props - The component props.
 * @param {Course} props.course - The course object containing course details.
 * @returns {JSX.Element} The rendered ToggleFavouriteCourse component.
 */
export function ToggleFavouriteCourse({ course }: { course: Course }) {
  const [isFavorite, setIsFavorite] = useState(Boolean(course.IsFavorite));
  const [optimisticCourse, setOptimisticCourse] = useOptimistic<
    Course,
    boolean
  >(course, (state, isFavorite) => ({ ...state, IsFavorite: isFavorite }));

  const formAction = async () => {
    const newIsfavourite = !isFavorite;
    setIsFavorite(newIsfavourite);
    setOptimisticCourse(newIsfavourite);

    const { message, success } = await toggleFavouriteCourseAction({
      isFavorite: newIsfavourite,
      courseId: course.CourseId,
    });

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <form action={formAction}>
      <SubmitButton course={optimisticCourse} />
    </form>
  );
}

function SubmitButton({ course }: { course: Course }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-full transition-all-200",
        course.IsFavorite
          ? "text-red-500 hover:text-red-600 hover:bg-red-50"
          : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
      )}
      aria-label={
        course.IsFavorite ? "Remove from favorites" : "Add to favorites"
      }
      disabled={pending}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all-200",
          course.IsFavorite ? "fill-current" : ""
        )}
      />
    </Button>
  );
}
