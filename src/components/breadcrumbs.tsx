"use client";

import { Fragment, type ReactNode } from "react";

import { ROUTES } from "@/app/api/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface BreadcrumbsProps {
  homeElement?: ReactNode;
  separator: ReactNode;
  capitalizeLinks?: boolean;
}

const Breadcrumbs = ({
  homeElement,
  separator,
  capitalizeLinks,
}: BreadcrumbsProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const params = useSearchParams();
  const searchParams = params.toString();
  const searchParamsValues = [...params.values()];

  return (
    <div className="py-8">
      <ul className="flex flex-row gap-2">
        {homeElement && (
          <li>
            <Link href={ROUTES.HOME} className="hover:underline">
              {homeElement}
            </Link>
          </li>
        )}
        {pathNames.length > 0 && homeElement && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isActive = paths === href;

          const formattedLinkContent = link.replaceAll("-", " ");
          const linkContent = capitalizeLinks
            ? formattedLinkContent[0].toUpperCase() +
              formattedLinkContent.slice(1, formattedLinkContent.length)
            : formattedLinkContent;

          return (
            <Fragment key={index}>
              <li className={cn(isActive && "text-primary")}>
                <Link
                  href={`${href}${
                    searchParams && isActive ? `?${searchParams}` : ""
                  }`}
                  className="inline-flex gap-1 hover:underline"
                >
                  {linkContent}
                  {isActive && searchParams ? (
                    <span>({searchParamsValues.join("/")})</span>
                  ) : null}
                </Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
