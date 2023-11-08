import { ROUTES } from "@/app/api/routes";
import InputSkeleton from "@/components/ui/skeletons/input-skeleton";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ManageSpecificationForm from "../components/manage-specification-form";

interface ManageSpecificationPageProps {
  searchParams: {
    specId: string;
  };
}

export default async function ManageSpecificationPage({
  searchParams,
}: ManageSpecificationPageProps) {
  let specificationData = null;

  if (searchParams.specId) {
    specificationData = await db.specification.findFirst({
      where: {
        id: searchParams.specId,
      },
    });

    if (!specificationData) {
      redirect(ROUTES.DASHBOARD.MANAGE_SPECIFICATIONS);
    }
  }

  const PAGE_HEADER = specificationData
    ? "Manage specification"
    : "Add specification";
  const PAGE_SUBHEADER = specificationData
    ? "Edit existing specification"
    : "Add new specification";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <TypographyH4>{PAGE_HEADER}</TypographyH4>
        <TypographyMuted>{PAGE_SUBHEADER}</TypographyMuted>
      </div>

      <Suspense fallback={<InputSkeleton />}>
        <ManageSpecificationForm
          initialData={
            specificationData
              ? {
                  id: specificationData.id,
                  name: specificationData.name,
                  unit: specificationData.unit ?? undefined,
                }
              : null
          }
        />
      </Suspense>
    </div>
  );
}
