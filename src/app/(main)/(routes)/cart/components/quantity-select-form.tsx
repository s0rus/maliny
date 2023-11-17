"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
import { updateItemQuantity } from "../actions";
import { QuantitySelect } from "./quantity-select";

interface QuantitySelectFormProps {
  entryId: string;
  initialQuantity: number;
}

export function QuantitySelectForm({
  entryId,
  initialQuantity,
}: QuantitySelectFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  async function dispatchAction(formData: FormData) {
    const result = await updateItemQuantity(formData);

    if (result.message && !result.errors) {
      toast({
        title: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: result.message,
      });
    }
  }

  return (
    <form action={dispatchAction} ref={formRef}>
      <input type="hidden" name="entryId" value={entryId} />
      <QuantitySelect formRef={formRef} initialQuantity={initialQuantity} />
    </form>
  );
}
