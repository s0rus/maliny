import { getBaseUrl } from "@/lib/utils";
import { API_ROUTES } from "../routes";
import { type FullProduct } from "./get-products";

export async function getProductByName(
  productName: string,
): Promise<FullProduct[] | []> {
  const response = await fetch(
    `${getBaseUrl()}/${API_ROUTES.PRODUCTS}?productName=${productName}`,
  );

  if (response.ok) {
    return response.json() as Promise<FullProduct[] | []>;
  }

  throw new Error("Could not fetch products");
}
