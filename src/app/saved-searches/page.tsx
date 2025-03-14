import { SavedSearches } from "@/components/search/saved-searches";
import { Bookmark } from "lucide-react";
import { Suspense } from "react";

export default function SavedSearchesPage() {
  return (
    <div className="container mx-auto transition-all animate-fade-in">
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Bookmark className="h-5 w-5 mr-2" />
          Saved Searches
        </h1>
        <p className="text-muted-foreground">
          Searches you have saved for quick access
        </p>
      </div>
      <Suspense fallback={<>Loading ...</>}>
        <SavedSearches />
      </Suspense>
    </div>
  );
}
