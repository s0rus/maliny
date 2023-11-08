import { getBaseUrl } from "@/lib/utils";
import { API_ROUTES } from "../routes";

export async function deleteImagesFromUT(images: string[]) {
  await fetch(`${getBaseUrl()}${API_ROUTES.UPLOADTHING}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      images,
    }),
  });
}
