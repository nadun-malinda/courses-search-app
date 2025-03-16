"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/courses";
import { Heart } from "lucide-react";
import { useState, useOptimistic, useTransition } from "react";
import { toggleFavouriteCourseAction } from "@/actions/course/toggle-favourite-course-action";
import { toast } from "sonner";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

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
  const [isPending, startTransition] = useTransition();
  const [optimisticCourse, setOptimisticCourse] = useOptimistic<
    Course,
    boolean
  >(course, (state, isFavorite) => ({ ...state, IsFavorite: isFavorite }));
  const debouncedCallback = useDebouncedCallback(() => formAction(), 500);

  const formAction = () => {
    startTransition(async () => {
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
    });
  };

  return (
    <form action={debouncedCallback}>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full transition-all-200",
          optimisticCourse.IsFavorite
            ? "text-red-500 hover:text-red-600 hover:bg-red-50"
            : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
        )}
        aria-label={
          optimisticCourse.IsFavorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        disabled={isPending}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all-200",
            optimisticCourse.IsFavorite ? "fill-current" : ""
          )}
        />
      </Button>
    </form>
  );
}
