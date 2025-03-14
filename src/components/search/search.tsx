import { SearchInput } from "./search-input";
import { QueryParams } from "@/types/filters";
import { SearchResult } from "./search-result";
import { Suspense } from "react";

export function Search({ urlSearchParams }: { urlSearchParams: QueryParams }) {
  return (
    <div className="space-y-6 pb-8 page-transition">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Search Courses</h1>
        <p className="text-muted-foreground">
          Find the perfect course for your educational journey
        </p>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <SearchInput />

        <Suspense fallback={<>Loading ...</>}>
          <SearchResult urlSearchParams={urlSearchParams} />
        </Suspense>
      </div>
    </div>
  );
}
