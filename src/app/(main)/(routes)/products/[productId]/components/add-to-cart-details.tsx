import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { calculateShippingInfo, priceFormatter } from "@/lib/utils";
import { AddToCartForm } from "./add-to-cart-form";

interface AddToCartDetailsProps {
  stock: number;
  price: number;
}

export function AddToCartDetails({ price, stock }: AddToCartDetailsProps) {
  const { arrival, payWithin } = calculateShippingInfo();

  return (
    <Card>
      <CardHeader className="justify-end p-3 text-right text-2xl font-semibold">
        {priceFormatter().format(price)}
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <AddToCartForm />
      </CardContent>
      <Separator />
      <CardFooter className="py-2">
        <div className="flex flex-row items-center gap-2">
          <Icon.checkmark />
          <div className="flex flex-col">
            <span className="font-semibold text-primary">Available</span>
            <span className="text-sm">
              {stock > 10 ? "10+" : stock} in stock
            </span>
          </div>
        </div>
      </CardFooter>
      <Separator />
      <CardFooter className="py-2">
        <div className="flex flex-row items-center gap-2">
          <Icon.clock />
          <div className="flex flex-col">
            <span className="font-semibold text-primary">
              Order now, get it {arrival}
            </span>
            {payWithin ? (
              <span className="text-sm">Pay within {payWithin}</span>
            ) : null}
          </div>
        </div>
      </CardFooter>
      <Separator />
      <CardFooter className="py-2">
        <div className="flex flex-row items-center gap-2">
          <Icon.truck />
          <div className="flex flex-col">
            <span className="font-semibold text-primary">Free shipping</span>
            <span className="text-sm">Check details</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
