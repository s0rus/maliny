"use client";

import { type Specifications } from "@/app/api/products/get-products";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { TypographyMuted } from "@/components/ui/typography/typography-muted";

interface SpecPreviewProps {
  specList: Specifications;
}

export function SpecPreview({ specList }: SpecPreviewProps) {
  function handleScroll() {
    const element = document.getElementById("specification");

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <ul className="flex flex-col">
        {specList.map((spec) => (
          <li
            key={spec.specification.id}
            className="inline-flex items-baseline gap-2"
          >
            <TypographyMuted>{spec.specification.name}:</TypographyMuted>
            {spec.value} {spec.specification.unit ?? null}
          </li>
        ))}
        <li>
          <Button
            onClick={handleScroll}
            variant="ghost"
            size="sm"
            className="inline-flex gap-2"
          >
            <Icon.chevronDown /> Scroll to full specification
          </Button>
        </li>
      </ul>
    </>
  );
}
