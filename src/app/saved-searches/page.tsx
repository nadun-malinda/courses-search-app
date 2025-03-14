import { SavedSearches } from "@/components/search/saved-searches";
import { Suspense } from "react";

export default function SavedSearchesPage() {
  return (
    <div className="container mx-auto transition-all animate-fade-in">
      <Suspense fallback={<>Loading ...</>}>
        <SavedSearches />
      </Suspense>
    </div>
  );
}
