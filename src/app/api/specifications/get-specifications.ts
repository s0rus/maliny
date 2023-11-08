import { getBaseUrl } from "@/lib/utils";
import { type Specification } from "@prisma/client";
import { API_ROUTES } from "../routes";

export async function getSpecifications(): Promise<Specification[]> {
  const response = await fetch(`${getBaseUrl()}/${API_ROUTES.SPECIFICATIONS}`);

  if (response.ok) {
    return response.json() as Promise<Specification[]>;
  }

  throw new Error("Could not fetch specifications");
}
