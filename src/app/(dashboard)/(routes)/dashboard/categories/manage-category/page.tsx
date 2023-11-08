import { ROUTES } from "@/app/api/routes";
import InputSkeleton from "@/components/ui/skeletons/input-skeleton";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ManageCategoryForm from "../components/manage-category-form";

interface ManageCategoryPageProps {
  searchParams: {
    categoryId: string;
  };
}

export default async function ManageCategoryPage({
  searchParams,
}: ManageCategoryPageProps) {
  let categoryData = null;

  if (searchParams.categoryId) {
    categoryData = await db.category.findFirst({
      where: {
        id: searchParams.categoryId,
      },
    });

    if (!categoryData) {
      redirect(ROUTES.DASHBOARD.MANAGE_CATEGORY);
    }
  }

  const PAGE_HEADER = categoryData ? "Manage category" : "Add category";
  const PAGE_SUBHEADER = categoryData
    ? "Edit existing product category"
    : "Add new product category";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <TypographyH4>{PAGE_HEADER}</TypographyH4>
        <TypographyMuted>{PAGE_SUBHEADER}</TypographyMuted>
      </div>
      <Suspense fallback={<InputSkeleton />}>
        <ManageCategoryForm initialData={categoryData} />
      </Suspense>
    </div>
  );
}
