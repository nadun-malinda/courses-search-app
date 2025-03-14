"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { LoaderCircle, Save } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { saveSearch } from "@/actions/search/save-search";

export function SearchSaveForm() {
  const searchParams = useSearchParams();
  const saveSearchAction = saveSearch.bind(null, searchParams.toString());
  const [state, formAction, isPending] = useActionState(saveSearchAction, {
    success: null,
    message: "",
  });

  useEffect(() => {
    // prevent showing the toast in the initial render.
    if (state.success !== null) {
      toast(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="transition-all-200 subtle-focus-ring"
        disabled={isPending || searchParams.size === 0}
      >
        {isPending ? (
          <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        Save Search
      </Button>
    </form>
  );
}
