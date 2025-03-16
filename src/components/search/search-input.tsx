"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchSaveForm } from "./search-save-form";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

/**
 * SearchInput Component
 *
 * Renders a search input field with debounced search functionality.
 */
export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("q") || "");
  const debouncedCallback = useDebouncedCallback(
    ({ text }: { text: string }) => setSearch({ text }),
    300
  );

  /**
   * Sets the search query parameter and updates the URL.
   *
   * @param {Object} params - The search parameters.
   * @param {string} params.text - The search text.
   */
  const setSearch = ({ text }: { text: string }) => {
    const params = new URLSearchParams(searchParams);

    if (text) {
      params.set("q", text);
    } else {
      params.delete("q");
    }

    // Set page to 0 with every new search
    params.set("page", "0");

    setSearchText(text);
    router.replace(`${pathname}/?${params.toString()}`);
  };

  /**
   * Handles the change event for the search input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setSearchText(text);
    debouncedCallback({ text });
  };

  return (
    <div className="space-y-4">
      <form className="relative">
        <Input
          type="text"
          name="searchText"
          value={searchText}
          onChange={handleOnChange}
          placeholder="Search for your courses..."
          className="pl-12 h-12"
        />
        <div className="absolute left-0 top-0 h-12 w-12 flex justify-center items-center">
          <SearchIcon className="h-4 w-4" />
        </div>
      </form>

      <div className="flex flex-wrap gap-2 items-center">
        <SearchSaveForm />
      </div>
    </div>
  );
}
