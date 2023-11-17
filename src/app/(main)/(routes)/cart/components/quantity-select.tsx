"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type MutableRefObject } from "react";
import { useFormStatus } from "react-dom";

interface QuantitySelectProps {
  initialQuantity: number;
  formRef: MutableRefObject<HTMLFormElement | null>;
}

export function QuantitySelect({
  formRef,
  initialQuantity,
}: QuantitySelectProps) {
  const { pending } = useFormStatus();

  return (
    <Select
      defaultValue={initialQuantity.toString()}
      name="quantity"
      onValueChange={() => formRef.current?.requestSubmit()}
      disabled={pending}
    >
      <SelectTrigger className="w-[64px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: 10 }, (_, i) => (
            <SelectItem key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
