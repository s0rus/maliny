"use client";

import { ROUTES } from "@/app/api/routes";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchResults } from "./search-results";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Q_PARAM = "q" as const;

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get(Q_PARAM)?.toString() ?? "";

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(Q_PARAM, term);
    } else {
      params.delete(Q_PARAM);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  function searchAction() {
    if (!query) {
      return;
    }

    redirect(`${ROUTES.SEARCH}?q=${query}`);
  }

  return (
    <form action={searchAction}>
      <Popover>
        <div className="flex">
          <PopoverTrigger asChild>
            <Input
              name="q"
              type="text"
              autoComplete="off"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={query}
              className="w-[60vw]"
            />
          </PopoverTrigger>
          <Button type="submit">
            <Icon.search />
          </Button>
        </div>
        {query && (
          <PopoverContent
            onFocusCapture={(e) => {
              e.preventDefault();
            }}
            className="w-[60vw]"
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
          >
            <SearchResults q={query} />
          </PopoverContent>
        )}
      </Popover>
    </form>
  );
}
