import { Clock, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { formatDistance } from "date-fns";
import { Badge } from "../ui/badge";
import { getQueryParams } from "@/utils/url";
import { DeleteSavedSearch } from "./delete-saved-search";
import { dbFetchSavedSearches } from "@/lib/data/search/db-fetch-saved-searches";
import { ApplySavedSearch } from "./apply-saved-search";
import { EmptyResult } from "../empty/empty-result";

/**
 * Displays saved searches with relevant details and options to apply or delete them.
 * @returns JSX element to render saved searches.
 */
export async function SavedSearches() {
  const savedSearches = await dbFetchSavedSearches();

  console.log(">>> savesSearches: ", savedSearches);

  return (
    <>
      {savedSearches.length === 0 ? (
        <EmptyResult
          title="No saved searches yet."
          message="Save your search parameters for quick access later."
        />
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedSearches?.map((search) => (
            <Card
              key={search.Id}
              className="transition-all-300 hover:shadow-sm animate-fade-in"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardDescription className="flex items-center mt-1 text-xs">
                      <Clock className="h-3 w-3 mr-1 inline" />
                      Saved{" "}
                      {formatDistance(search.CreatedAt, new Date(), {
                        addSuffix: true,
                      })}
                    </CardDescription>
                  </div>
                  <DeleteSavedSearch searchId={search.Id} />
                </div>
              </CardHeader>
              <CardContent>
                {search.SearchQuery && (
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Search className="h-3 w-3 mr-1" />
                      <DisplaySearchText queryString={search.SearchQuery} />
                    </p>
                  </div>
                )}

                <DisplayFilters queryString={search.SearchQuery} />
              </CardContent>
              <CardFooter>
                <ApplySavedSearch search={search} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

/**
 * Extracts and displays the search text from the query string.
 * @param {Object} props
 * @param {string} props.queryString - The query string containing the search parameters.
 * @returns JSX element to display the search text.
 */
function DisplaySearchText({ queryString }: { queryString: string }) {
  const { q } = getQueryParams(queryString);

  return q ? <span>{q}</span> : null;
}

/**
 * Displays the filters (category and location) based on the query string.
 * @param {Object} props
 * @param {string} props.queryString - The query string containing the filter parameters.
 * @returns JSX element to display category and location badges.
 */
function DisplayFilters({ queryString }: { queryString: string }) {
  const { category, location } = getQueryParams(queryString);

  const badges = [
    { label: "Categories", values: category },
    { label: "Locations", values: location },
  ];

  return (
    <div className="space-y-2">
      {badges.map(
        ({ label, values }) =>
          values && (
            <div key={label}>
              <p className="text-xs font-medium mb-1 text-muted-foreground capitalize">
                {label}
              </p>
              <div className="flex flex-wrap gap-1">
                {values.map((value, i) => (
                  <Badge variant="secondary" className="text-xs" key={i}>
                    {value}
                  </Badge>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
