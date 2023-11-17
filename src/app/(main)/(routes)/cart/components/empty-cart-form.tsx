"use client";

import { Icon } from "@/components/ui/icon";
import { SubmitButton } from "@/components/ui/submit-button";
import { emptyCart } from "../actions";

export function EmptyCartForm() {
  return (
    <form action={emptyCart}>
      <SubmitButton icon={<Icon.delete className="h-4 w-4" />} variant="ghost">
        Empty cart
      </SubmitButton>
    </form>
  );
}
