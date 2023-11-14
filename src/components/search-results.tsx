"use client";

import { type FullProduct } from "@/app/api/products/get-products";
import { ROUTES } from "@/app/api/routes";
import { getProductsByQuery } from "@/db/actions";
import { priceFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function SearchResults({ q }: { q: string }) {
  const [isSearchPending, startTransition] = useTransition();
  const [results, setResults] = useState<FullProduct[] | [] | null>(null);

  useEffect(() => {
    setResults(null);

    startTransition(async () => {
      const resultData = await getProductsByQuery({ q, take: 5 });
      setResults(resultData);
    });
  }, [q]);

  if (!q) {
    return null;
  }

  if (isSearchPending) {
    return (
      <div className="flex w-full items-center justify-center">
        <Icon.loading className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      {results && results.length > 0 && !isSearchPending ? (
        <div className="flex flex-col gap-2">
          {results.map((result) => (
            <Button
              key={result.id}
              asChild
              variant="ghost"
              className="flex h-full w-full justify-start"
            >
              <Link
                href={`${ROUTES.PRODUCTS}/${result.id}`}
                className="flex flex-row items-center justify-between"
              >
                <div className="flex flex-row gap-4">
                  <Image
                    src={result.images[0].image_url}
                    alt={`${result.name}'s image`}
                    width={64}
                    height={64}
                    className="h-auto max-w-full"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <p>{result.name}</p>
                    <Badge variant="secondary">{result.category.name}</Badge>
                  </div>
                </div>
                <div className="text-md justify-self-end">
                  {priceFormatter().format(result.price)}
                </div>
              </Link>
            </Button>
          ))}
        </div>
      ) : (
        <div>No results for &quot;{q}&quot; found.</div>
      )}
    </>
  );
}
