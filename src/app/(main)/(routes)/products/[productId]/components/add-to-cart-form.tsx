"use client";

import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button";
import { useToast } from "@/components/ui/use-toast";
import { addItemToCart } from "../../../cart/actions";

interface AddToCartFormProps {
  productId: string;
}

export function AddToCartForm({ productId }: AddToCartFormProps) {
  const { toast } = useToast();

  async function dispatchAction(formData: FormData) {
    const result = await addItemToCart(null, formData);
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
    <form
      className="flex flex-row justify-between gap-4"
      action={dispatchAction}
    >
      <input type="hidden" name="productId" value={productId} />
      <Select defaultValue="1" name="quantity">
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
      <SubmitButton icon={<Icon.cart />} className="w-full">
        Add to cart
      </SubmitButton>
    </form>
  );
}
