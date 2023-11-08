import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/typography/typography-h3";
import Link from "next/link";
import { ROUTES } from "../api/routes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <div>
      <nav className="flex items-center justify-between gap-16 py-4">
        <div>
          <TypographyH3>Maliny dashboard</TypographyH3>
        </div>
        <div>
          <Button variant="ghost" size="icon" asChild>
            <Link href={ROUTES.DASHBOARD.HOME}>
              <Icon.home />
            </Link>
          </Button>
        </div>
      </nav>
      <Separator />
      <Breadcrumbs separator={<span>/</span>} capitalizeLinks />
      {props.children}
    </div>
  );
}
