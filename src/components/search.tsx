"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchResults } from "./search-results";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Q_PARAM = "q" as const;

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(Q_PARAM, term);
    } else {
      params.delete(Q_PARAM);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const query = searchParams.get(Q_PARAM)?.toString() ?? "";

  return (
    <>
      <form>
        <Popover>
          <PopoverTrigger asChild>
            <Input
              type="text"
              autoComplete="off"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              defaultValue={query}
              className="w-[60vw]"
            />
          </PopoverTrigger>
          {query && (
            <PopoverContent
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
    </>
  );
}
