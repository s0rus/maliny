import { getBaseUrl } from "@/lib/utils";
import { type Category } from "@prisma/client";
import { API_ROUTES } from "../routes";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${getBaseUrl()}/${API_ROUTES.CATEGORIES}`);

  if (response.ok) {
    return response.json() as Promise<Category[]>;
  }

  throw new Error("Could not fetch categories");
}
