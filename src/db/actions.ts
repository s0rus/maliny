"use server";

import { type FullProduct } from "@/app/api/products/get-products";
import { db } from ".";

export async function getProductsByQuery({
  q,
  take,
}: {
  q: string;
  take: number;
}): Promise<FullProduct[]> {
  if (!q) {
    return [];
  }

  try {
    const productsList = await db.product.findMany({
      where: {
        name: {
          contains: q,
        },
      },
      take,
      include: {
        category: true,
        images: true,
        specifications: {
          include: {
            specification: true,
          },
        },
      },
    });

    return productsList;
  } catch (error) {
    console.log(error);
    return [];
  }
}
