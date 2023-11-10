"use server";

import { type FullProduct } from "@/app/api/products/get-products";
import { db } from ".";

// const ProductSearchSchema = z.object({
//   q: z.string().min(1),
// });

export async function getProductsByQuery({
  q,
}: {
  q: string;
}): Promise<FullProduct[]> {
  // console.log(q);

  // const validatedFields = ProductSearchSchema.safeParse({ q });

  // if (!validatedFields.success) {
  //   return [];
  // }

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
