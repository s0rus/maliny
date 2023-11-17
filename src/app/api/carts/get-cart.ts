import { getBaseUrl } from "@/lib/utils";
import { type Cart, type CartEntry } from "@prisma/client";
import { type FullProduct } from "../products/get-products";
import { API_ROUTES } from "../routes";

export type FullCartEntry = CartEntry & {
  product: Omit<FullProduct, "category" | "specifications">;
};

export type FullCart = Cart & {
  entries: FullCartEntry[];
};

export async function getCart({
  userId,
}: {
  userId: string;
}): Promise<FullCart> {
  const response = await fetch(
    `${getBaseUrl()}/${API_ROUTES.CARTS}?userId=${userId}`,
  );

  if (response.ok) {
    return response.json() as Promise<FullCart>;
  }

  throw new Error("Could not fetch cart");
}
