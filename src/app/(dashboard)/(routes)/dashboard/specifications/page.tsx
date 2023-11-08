import { ROUTES } from "@/app/api/routes";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import TableContentSkeleton from "@/components/ui/skeletons/table-content-skeleton";
import { TypographyH4 } from "@/components/ui/typography/typography-h4";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";
import Link from "next/link";
import { Suspense } from "react";
import { SpecificationTable } from "./components/specification-table";

export default function DashboardSpecificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <TypographyH4>Specification parameters</TypographyH4>
          <TypographyMuted>Manage specifications of products</TypographyMuted>
        </div>
        <div>
          <Button className="inline-flex gap-2" asChild>
            <Link href={ROUTES.DASHBOARD.MANAGE_SPECIFICATIONS}>
              <Icon.plus /> Add parameter
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <Suspense fallback={<TableContentSkeleton />}>
          <SpecificationTable />
        </Suspense>
      </div>
    </div>
  );
}
