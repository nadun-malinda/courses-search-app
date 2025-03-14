"use client";

import { Searches } from "@/types/searches";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function ApplySavedSearch({ search }: { search: Searches }) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full transition-all-200"
      onClick={() => router.push(`/?${search.SearchQuery}`)}
    >
      Apply This Search
    </Button>
  );
}
