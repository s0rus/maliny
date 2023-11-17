"use client";

import { Icon } from "@/components/ui/icon";
import { SubmitButton } from "@/components/ui/submit-button";
import { removeItemFromCart } from "../actions";

interface RemoveItemFormProps {
  entryId: string;
}

export function RemoveItemForm({ entryId }: RemoveItemFormProps) {
  return (
    <form action={removeItemFromCart}>
      <input type="hidden" name="entryId" value={entryId} />
      <SubmitButton
        icon={<Icon.delete className="h-4 w-4" />}
        variant="ghost"
        loadingIconProps={{
          className: "h-4 w-4",
        }}
      />
    </form>
  );
}
