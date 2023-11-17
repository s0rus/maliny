import { getCart } from "@/app/api/carts/get-cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/typography/typography-h3";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { priceFormatter } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { CartItemsTable } from "./components/cart-items-table";
import { EmptyCartForm } from "./components/empty-cart-form";

export default async function CartPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>Log in to add products to the cart</div>;
  }

  const cart = await getCart({ userId });

  if (!cart || cart.entries.length < 1) {
    return <div>cart is empty</div>;
  }

  const { quantitySum, priceSum } = cart.entries.reduce(
    (acc, entry) => {
      return {
        priceSum: acc.priceSum + entry.product.price * entry.quantity,
        quantitySum: acc.quantitySum + entry.quantity,
      };
    },
    {
      quantitySum: 0,
      priceSum: 0,
    },
  );

  return (
    <div className="grid grid-cols-3 gap-16">
      <div className="col-span-2">
        <div className="flex justify-between">
          <div className="inline-flex items-baseline gap-4">
            <TypographyH3 className="text-4xl">Cart</TypographyH3>
            <TypographyMuted className="text-lg">
              ({quantitySum})
            </TypographyMuted>
          </div>
          <div>
            <EmptyCartForm />
          </div>
        </div>
        <Separator className="my-2" />
        <CartItemsTable items={cart.entries} />
      </div>
      <div className="col-span-1">
        <Card className="sticky top-10 flex flex-col gap-4 px-4 py-8">
          <div className="inline-flex w-full items-baseline justify-between">
            <TypographyMuted>Total price</TypographyMuted>
            <TypographyH4>
              {priceFormatter().format(priceSum) || 0}
            </TypographyH4>
          </div>
          <Button asChild className="inline-flex w-full gap-4">
            <Link href={"/shipping"}>
              Go to shipping
              <Icon.chevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex gap-2 text-primary-foreground/30">
            <div>
              <Icon.alert className="h-4 w-4" />
            </div>
            <p className="text-sm">
              Remeber that adding an item to the cart doesn&apos;t mean
              it&apos;s reserved. Complete the payment to be sure you will
              recieve it!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
