"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteSearchAction } from "@/actions/search/delete-search-action";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

/**
 * Component to delete a saved search.
 *
 * @param {Object} props - Component props.
 * @param {string} props.searchId - The ID of the search to delete.
 * @returns {JSX.Element} - DeleteSavedSearch component.
 */
export function DeleteSavedSearch({ searchId }: { searchId: string }) {
  const formAction = async () => {
    const { message, success } = await deleteSearchAction(searchId);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}

/**
 * Submit button component with loading state.
 *
 * @returns {JSX.Element} - SubmitButton component.
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-2"
      aria-label="Delete saved search"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
