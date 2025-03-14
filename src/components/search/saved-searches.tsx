import { Bookmark, Clock, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import { formatDistance } from "date-fns";
import { Badge } from "../ui/badge";
import { getQueryParams } from "@/utils/url";
import { DeleteSavedSearch } from "./delete-saved-search";
import { fetchSavedSearches } from "@/lib/data/search/fetch-saved-searches";

/**
 * Displays saved searches with relevant details and options to apply or delete them.
 * @returns JSX element to render saved searches.
 */
export async function SavedSearches() {
  const savedSearches = await fetchSavedSearches();

  console.log(">>> savesSearches: ", savedSearches);

  return (
    <>
      <h2 className="text-xl font-semibold flex items-center">
        <Bookmark className="h-5 w-5 mr-2" />
        Saved Searches
      </h2>

      {savedSearches.length === 0 ? (
        <EmptyResult />
      ) : (
        <div className="grid grid-cols-4 gap-4">
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
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full transition-all-200"
                  //   onClick={() => applySavedSearch(search)}
                >
                  Apply This Search
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

function EmptyResult() {
  return (
    <Card className="border-dashed bg-muted/30">
      <CardContent className="pt-6 text-center">
        <p className="text-muted-foreground">No saved searches yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Save your search parameters for quick access later.
        </p>
      </CardContent>
    </Card>
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
