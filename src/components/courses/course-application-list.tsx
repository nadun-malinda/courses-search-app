import { CourseApplication } from "@/types/courses";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, GraduationCap } from "lucide-react";
import { formatDistance } from "date-fns";
import Link from "next/link";

export function CourseApplicationList({
  applications,
}: {
  applications: CourseApplication[];
}) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
      {applications.map((application) => (
        <Link key={application.Id} href={`/applications/${application.Id}`}>
          <Card className="overflow-hidden transition-all-300 hover:shadow-md group h-full border border-border/40 bg-white p-0">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant="outline"
                  className="font-normal text-xs bg-secondary mb-2 transition-all-200"
                >
                  {application.CoursesTable?.Category}
                </Badge>
              </div>

              <h3 className="font-medium text-lg mb-1 text-balance leading-tight">
                {application.CoursesTable?.CourseName}
              </h3>

              <div className="flex items-center text-muted-foreground text-sm">
                <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{application.CoursesTable?.InstituteName}</span>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>
                    Applied{" "}
                    {formatDistance(application.CreatedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              <div className="text-sm mt-4">
                <div>
                  <span>First name: </span>
                  <span className="text-muted-foreground">
                    {application.FirstName}
                  </span>
                </div>
                <div>
                  <span>Last name: </span>
                  <span className="text-muted-foreground">
                    {application.LastName}
                  </span>
                </div>
                <div>
                  <span>Email: </span>
                  <span className="text-muted-foreground">
                    {application.Email}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
