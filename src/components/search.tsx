"use client";

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Input } from "./ui/input";

const Q_PARAM = "q" as const;

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    if (search.value) {
      params.set(Q_PARAM, search.value);
    } else {
      params.delete(Q_PARAM);
    }

    startTransition(() => {
      router.push(createUrl("/search", params));
    });
  }

  const query = searchParams.get(Q_PARAM)?.toString() ?? "";

  return (
    <>
      <form onSubmit={handleSearch} className="flex flex-row items-center">
        <div className="relative w-full">
          <Button
            className="absolute text-muted hover:text-muted-foreground"
            size="icon"
            variant="ghost"
            disabled={pending}
          >
            {pending ? (
              <Icon.loading className="h-5 w-5" />
            ) : (
              <Icon.search className="h-5 w-5" />
            )}
          </Button>
          <Input
            className="pl-12"
            key={searchParams?.get("q")}
            type="text"
            name="search"
            autoComplete="off"
            defaultValue={query}
          />
        </div>
      </form>
    </>
  );
}
