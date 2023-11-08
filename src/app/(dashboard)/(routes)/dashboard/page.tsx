import { ROUTES } from "@/app/api/routes";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-md border border-primary px-4 py-2">
        <p>Quick actions</p>

        <div className="flex flex-row gap-4">
          <div className="flex gap-2">
            <Button asChild className="inline-flex gap-2">
              <Link href={ROUTES.DASHBOARD.MANAGE_PRODUCT}>
                <Icon.addProduct /> Add product
              </Link>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button asChild className="inline-flex gap-2">
              <Link href={ROUTES.DASHBOARD.MANAGE_CATEGORY}>
                <Icon.plus /> Add category
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Button asChild>
          <Link href={ROUTES.DASHBOARD.PRODUCTS}>Products</Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.DASHBOARD.CATEGORIES}>Categories</Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.DASHBOARD.SPECIFICATIONS}>Specifications</Link>
        </Button>
      </div>
    </div>
  );
}
