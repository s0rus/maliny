import { ROUTES } from "@/app/api/routes";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import TableContentSkeleton from "@/components/ui/skeletons/table-content-skeleton";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import Link from "next/link";
import { Suspense } from "react";
import { ProductTable } from "./components/product-table";

export default function DashboardProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <TypographyH4>Products</TypographyH4>
          <TypographyMuted>Manage products of the store</TypographyMuted>
        </div>
        <div>
          <Button className="inline-flex gap-2" asChild>
            <Link href={ROUTES.DASHBOARD.MANAGE_PRODUCT}>
              <Icon.plus /> Add product
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <Suspense fallback={<TableContentSkeleton />}>
          <ProductTable />
        </Suspense>
      </div>
    </div>
  );
}
