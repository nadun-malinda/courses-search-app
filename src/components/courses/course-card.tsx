import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { BookOpen, Calendar, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { Course } from "@/types/courses";
import { getFormattedDate } from "@/utils/date";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all-300 hover:shadow-md group h-full border border-border/40 bg-white p-0">
      <CardContent className="p-6 flex flex-col h-full">
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

        <h3 className="font-medium text-lg mb-1 text-balance leading-tight">
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

      <CardFooter className="py-4 bg-secondary/30 border-t border-border/40">
        <div className="w-full flex flex-wrap gap-2 sm:flex-nowrap">
          <Button
            variant="default"
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
