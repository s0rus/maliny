import { getBaseUrl } from "@/lib/utils";
import {
  type Category,
  type Image,
  type Product,
  type ProductSpecification,
  type Specification,
} from "@prisma/client";
import { API_ROUTES } from "../routes";

type Specifications = (ProductSpecification & {
  specification: Specification;
})[];

export type FullProduct = Product & {
  specifications: Specifications;
  images: Image[];
} & Category;

export async function getProducts(): Promise<FullProduct[]> {
  const response = await fetch(`${getBaseUrl()}/${API_ROUTES.PRODUCTS}`);

  if (response.ok) {
    return response.json() as Promise<FullProduct[]>;
  }

  throw new Error("Could not fetch products");
}
