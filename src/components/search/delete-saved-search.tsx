"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { deleteSearchAction } from "@/actions/search/delete-search-action";
import { toast } from "sonner";

export function DeleteSavedSearch({ searchId }: { searchId: string }) {
  const action = deleteSearchAction.bind(null, searchId);
  const [state, formAction, isPending] = useActionState(action, {
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
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-2"
        aria-label="Delete saved search"
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
