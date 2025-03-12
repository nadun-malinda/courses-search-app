import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { BookOpen, Calendar, ExternalLink, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { Course } from "@/types/courses";
import { getFormattedDate } from "@/utils/date";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact";
}

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all-300 hover:shadow-md group h-full",
        "border border-border/40 bg-white"
      )}
    >
      <CardContent
        className={cn(
          "p-4 sm:p-6 flex flex-col h-full",
          variant === "compact" ? "sm:p-4" : ""
        )}
      >
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="outline"
            className="font-normal text-xs bg-secondary mb-2 transition-all-200"
          >
            {course.Category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full transition-all-200",
              course.IsFavorite
                ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
            )}
            // onClick={handleFavoriteToggle}
            aria-label={
              course.IsFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all-200",
                course.IsFavorite ? "fill-current" : ""
              )}
            />
          </Button>
        </div>

        <h3
          className={cn(
            "font-medium text-lg mb-1 text-balance leading-tight",
            variant === "compact" ? "text-base" : ""
          )}
        >
          {course.CourseName}
        </h3>

        <p className="text-muted-foreground text-sm mb-4">
          {course.InstituteName}
        </p>

        <div className="space-y-2 mt-auto">
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{getFormattedDate(course.StartDate)}</span>
          </div>

          {course.Location && (
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{course.Location}</span>
            </div>
          )}

          <div className="flex items-center text-muted-foreground text-sm">
            <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{course.DeliveryMethod}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter
        className={cn(
          "px-6 py-4 bg-secondary/30 border-t border-border/40",
          variant === "compact" ? "px-4 py-3" : ""
        )}
      >
        <div className="w-full flex flex-wrap gap-2 sm:flex-nowrap">
          <Button
            variant="outline"
            size={variant === "compact" ? "sm" : "default"}
            className="w-full sm:w-auto bg-white hover:bg-secondary transition-all-200"
            asChild
          >
            <Link href={`/course/${course.CourseId}`}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Details
            </Link>
          </Button>
          <Button
            variant="default"
            size={variant === "compact" ? "sm" : "default"}
            className="w-full sm:w-auto transition-all-200"
            asChild
          >
            <Link href={`/apply/${course.CourseId}`}>Apply Now</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
