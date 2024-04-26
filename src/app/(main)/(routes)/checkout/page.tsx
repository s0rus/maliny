import { getCart } from "@/app/api/carts/get-cart";
import { ROUTES } from "@/app/api/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/typography/typography-h3";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { priceFormatter } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AddressCard } from "./components/address-card";

export default async function CheckoutPage() {
  const { userId } = auth();

  if (!userId) {
    redirect(ROUTES.HOME);
  }

  const cart = await getCart({ userId });

  if (!cart || !cart.entries.length) {
    redirect(ROUTES.HOME);
  }

  const priceSum = cart.entries.reduce(
    (acc, entry) => acc + entry.product.price,
    0,
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-lg items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <Link href={ROUTES.CART}>
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Icon.checkmark />
              </div>
              <TypographyH4 className="text-sm text-primary">Cart</TypographyH4>
            </Link>
          </div>
          <Separator className="min-w-[10px] max-w-sm shrink" />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              2
            </div>
            <TypographyH4 className="text-sm text-primary">
              Checkout
            </TypographyH4>
          </div>
          <Separator className="min-w-[10px] max-w-sm shrink" />
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-none">
              3
            </div>
            <TypographyH4 className="text-sm text-primary">
              Summary
            </TypographyH4>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2">
          <div className="flex justify-between">
            <div>
              <TypographyH3 className="text-4xl">Checkout</TypographyH3>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-4">
            <AddressCard />
            <Card>
              <CardHeader className="text-xl font-bold">Payment</CardHeader>
              <CardContent>
                <div className="rounded-sm border border-primary px-4 py-2">
                  payment form
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="col-span-1">
          <Card className="sticky top-10 flex flex-col gap-4 px-4 py-8">
            {cart.entries.map((item) => (
              <p key={item.id}>{item.product.name}</p>
            ))}
            <div className="inline-flex w-full items-baseline justify-between">
              <TypographyMuted>Total price</TypographyMuted>
              <TypographyH4>
                {priceFormatter().format(priceSum) || 0}
              </TypographyH4>
            </div>
            <Button asChild className="inline-flex w-full gap-2">
              <Link href={ROUTES.CHECKOUT}>
                Summary
                <Icon.chevronRight className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex gap-2 text-primary-foreground/30">
              <div>
                <Icon.alert className="h-4 w-4" />
              </div>
              <p className="text-sm">
                Finish the checkout to be sure you will recieve your items.
                Adding something to the cart doesn&apos;t mean it&apos;s
                reserved.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
