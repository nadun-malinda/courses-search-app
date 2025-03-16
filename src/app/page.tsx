import { SearchInput } from "@/components/search/search-input";
import { SearchResult } from "@/components/search/search-result";
import { type QueryParams } from "@/types/filters";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const urlSearchParams = await searchParams;

  return (
    <div className="container mx-auto transition-all animate-fade-in">
      <div className="space-y-6 pb-8 page-transition">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Search Courses</h1>
          <p className="text-muted-foreground">
            Find the perfect course for your educational journey
          </p>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <SearchInput />

          <Suspense
            key={`${urlSearchParams.q}${urlSearchParams.page}`}
            fallback={<>Loading ...</>}
          >
            <SearchResult urlSearchParams={urlSearchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
