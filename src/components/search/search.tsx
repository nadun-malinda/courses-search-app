import { Bookmark } from "lucide-react";
import { Card, CardContent } from "../ui/card";
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SearchInput />

          <Suspense fallback={<>Loading ...</>}>
            <SearchResult urlSearchParams={urlSearchParams} />
          </Suspense>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Bookmark className="h-5 w-5 mr-2" />
            Saved Searches
          </h2>

          <Card className="border-dashed bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No saved searches yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Save your search parameters for quick access later.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
