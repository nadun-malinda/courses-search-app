import { dbFetchApplication } from "@/lib/data/course/db-fetch-application";
import { dbFetchApplications } from "@/lib/data/course/db-fetch-applications";
import { formatDistance } from "date-fns";
import { Calendar, FileText } from "lucide-react";

export default async function CourseApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await dbFetchApplication(id);

  return (
    <div className="container mx-auto transition-all animate-fade-in">
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          Your application:
        </h1>
        <p className="text-muted-foreground">
          Application ID: {application.Id}
        </p>

        <div className="my-4">
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

        <div className="space-y-2 text-large">
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
            <span className="text-muted-foreground">{application.Email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const generateStaticParams = async () => {
  const applications = await dbFetchApplications();
  return applications.map((application) => ({ id: application.Id }));
};
