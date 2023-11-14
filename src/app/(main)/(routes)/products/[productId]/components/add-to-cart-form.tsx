"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddToCartForm() {
  return (
    <form className="flex flex-row justify-between gap-4">
      <Select defaultValue="1">
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
      <Button className="inline-flex flex-1 gap-2 px-8" type="submit">
        <Icon.cart />
        Add to cart
      </Button>
    </form>
  );
}
