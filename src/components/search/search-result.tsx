import { CourseList } from "../courses/course-list";
import { QueryParams } from "@/types/filters";
import { dbFetchCourses } from "@/lib/data/course/db-fetch-courses";
import { PaginationWrap } from "../pagination/pagination-wrap";
import { PAGE_LIMIT } from "@/lib/contstants";

export async function SearchResult({
  urlSearchParams,
}: {
  urlSearchParams: QueryParams;
}) {
  const page = Number(urlSearchParams.page) || 1;
  const limit = PAGE_LIMIT;
  const { courses, totalCount } = await dbFetchCourses(
    urlSearchParams,
    page,
    limit
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center">
        Search Results
        <span className="ml-2 text-sm font-normal text-muted-foreground">
          (Showing {courses.length} out of {totalCount} results)
        </span>
      </h2>
      <CourseList courses={courses} />
      <PaginationWrap
        page={page}
        totalCount={totalCount || 0}
        pageSize={limit}
        pageSearchParam="page"
      />
    </div>
  );
}
