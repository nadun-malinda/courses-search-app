import { CourseApplicationList } from "@/components/courses/course-application-list";
import { EmptyResult } from "@/components/empty/empty-result";
import { dbFetchApplications } from "@/lib/data/course/db-fetch-applications";
import { FileText } from "lucide-react";

export default async function CourseApplicationsPage() {
  const applications = await dbFetchApplications();

  return (
    <div className="container mx-auto transition-all animate-fade-in">
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          Your applications
        </h1>
        <p className="text-muted-foreground">
          Applications you ahve submitted for courses.
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyResult
          title="No submitted applications."
          message="Search for a course and apply."
        />
      ) : (
        <CourseApplicationList applications={applications} />
      )}
    </div>
  );
}
