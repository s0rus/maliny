import { getCategories } from "@/app/api/categories/get-categories";
import { ROUTES } from "@/app/api/routes";
import { getSpecifications } from "@/app/api/specifications/get-specifications";
import InputSkeleton from "@/components/ui/skeletons/input-skeleton";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ManageProductForm from "../components/manage-product-form";
import { type ProductSchema } from "./schema";

interface ManageProductPageProps {
  searchParams: {
    productId: string;
  };
}

export default async function ManageProductPage({
  searchParams,
}: ManageProductPageProps) {
  const categoriesData = getCategories();
  const specificationsData = getSpecifications();

  const [categories, specNames] = await Promise.all([
    categoriesData,
    specificationsData,
  ]);

  let productData = null;
  let formattedInitialData: ProductSchema | undefined = undefined;

  if (searchParams.productId) {
    productData = await db.product.findFirst({
      where: {
        id: searchParams.productId,
      },
      include: {
        specifications: {
          include: {
            specification: true,
          },
        },
        images: true,
      },
    });

    if (!productData) {
      redirect(ROUTES.DASHBOARD.MANAGE_PRODUCT);
    }

    formattedInitialData = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      stock: productData.stock,
      images: productData.images.map((image) => ({
        fileKey: image.image_key,
        fileUrl: image.image_url,
      })),
      specifications: productData.specifications.map((spec) => ({
        specId: spec.spec_id,
        value: spec.value,
        unit: spec.specification.unit,
      })),
      categoryId: productData.category_id,
    };
  }

  const PAGE_HEADER = productData ? "Manage product" : "Add product";
  const PAGE_SUBHEADER = productData
    ? "Edit existing product"
    : "Add new product";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <TypographyH4>{PAGE_HEADER}</TypographyH4>
        <TypographyMuted>{PAGE_SUBHEADER}</TypographyMuted>
      </div>
      <Suspense fallback={<InputSkeleton />}>
        <ManageProductForm
          initialData={formattedInitialData ?? null}
          categories={categories}
          specParameters={specNames}
        />
      </Suspense>
    </div>
  );
}
