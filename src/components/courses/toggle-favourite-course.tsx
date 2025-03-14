"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Course } from "@/types/courses";
import { Heart, LoaderCircle } from "lucide-react";
import { useActionState, useEffect, useState, useCallback } from "react";
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
  const [isSave, setIsSave] = useState(!Boolean(course.IsFavorite));

  // Binds the action with initial parameters
  const action = toggleFavouriteCourseAction.bind(null, {
    isSave,
    courseId: course.CourseId,
  });

  const [{ success, message }, formAction, isPending] = useActionState(action, {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (success !== null) {
      toast(message);
    }
  }, [success, message]);

  /**
   * Handles toggling the favorite state.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The button click event.
   */
  const handleFavoriteToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsSave((prev) => !prev); // Ensures latest state update
      e.currentTarget.form?.requestSubmit();
    },
    []
  );

  return (
    <form action={formAction}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 rounded-full transition-all-200",
          course.IsFavorite
            ? "text-red-500 hover:text-red-600 hover:bg-red-50"
            : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
        )}
        onClick={handleFavoriteToggle}
        aria-label={
          course.IsFavorite ? "Remove from favorites" : "Add to favorites"
        }
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Heart
            className={cn(
              "h-4 w-4 transition-all-200",
              course.IsFavorite ? "fill-current" : ""
            )}
          />
        )}
      </Button>
    </form>
  );
}
