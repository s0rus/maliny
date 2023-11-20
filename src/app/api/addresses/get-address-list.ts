import { getBaseUrl } from "@/lib/utils";
import { type Address } from "@prisma/client";
import { API_ROUTES } from "../routes";

export async function getAddressList({
  userId,
}: {
  userId: string;
}): Promise<Address[]> {
  const response = await fetch(
    `${getBaseUrl()}/${API_ROUTES.ADDRESSES}?userId=${userId}`,
  );

  if (response.ok) {
    return response.json() as Promise<Address[]>;
  }

  throw new Error("Could not fetch address list");
}
