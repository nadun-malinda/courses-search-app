"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchSaveForm } from "./search-save-form";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleSubmit = (formData: FormData) => {
    const searchText = (formData.get("searchText") as string) ?? "";
    const params = new URLSearchParams(searchParams);

    if (searchText) {
      params.set("q", searchText);
    } else {
      params.delete("q");
    }

    setSearch(searchText);
    router.push(`${pathname}/?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <form action={handleSubmit} className="relative">
        <Input
          type="text"
          name="searchText"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for your courses..."
          className="pr-10 h-12"
        />

        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-12 w-12 text-muted-foreground"
          aria-label="Search"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex flex-wrap gap-2 items-center">
        <SearchSaveForm />
      </div>
    </div>
  );
}
