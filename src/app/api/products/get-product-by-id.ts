import { db } from "@/db";

export async function getProductById(productId: string) {
  const product = await db.product.findFirstOrThrow({
    where: {
      id: productId,
    },
    include: {
      category: true,
      specifications: {
        include: {
          specification: true,
        },
      },
      images: true,
    },
  });

  return product;
}
