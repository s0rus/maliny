import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../separator";

export default function SearchSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="h-12 w-72" />
        <Separator className="my-4" />
      </div>
      <div className="grid grid-cols-3 gap-16">
        {Array(12)
          .fill(0)
          .map((_, index) => {
            return <Skeleton key={index} className="h-[432px]" />;
          })}
      </div>
    </>
  );
}
