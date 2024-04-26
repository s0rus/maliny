import { getCart } from "@/app/api/carts/get-cart";
import { ROUTES } from "@/app/api/routes";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export default async function CartButton() {
  const { userId } = auth();
  let quantitySum: number | null = null;

  if (userId) {
    const cart = await getCart({ userId });
    if (cart && cart.entries.length) {
      quantitySum = cart.entries.reduce(
        (acc, entry) => acc + entry.quantity,
        0,
      );
    }
  }

  return (
    <div className="relative">
      <Button asChild variant="outline" size="icon">
        <Link href={ROUTES.CART}>
          <Icon.cart />
        </Link>
      </Button>
      {quantitySum ? (
        <Badge className="absolute right-[-10px] top-[-12px] rounded-sm px-1.5 py-0.5 hover:bg-primary">
          {quantitySum > 9 ? `9+` : quantitySum}
        </Badge>
      ) : null}
    </div>
  );
}
