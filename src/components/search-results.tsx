"use client";

import { type FullProduct } from "@/app/api/products/get-products";
import { getProductsByQuery } from "@/db/actions";
import { useEffect, useState, useTransition } from "react";
import { Icon } from "./ui/icon";

export function SearchResults({ q }: { q: string }) {
  const [isSearchPending, startTransition] = useTransition();
  const [results, setResults] = useState<FullProduct[] | [] | null>(null);

  useEffect(() => {
    setResults(null);

    startTransition(async () => {
      const resultData = await getProductsByQuery({ q });
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
        results.map((result) => <div key={result.id}>{result.name}</div>)
      ) : (
        <div>No results found</div>
      )}
    </>
  );
}
