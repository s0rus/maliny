import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import TableContentSkeleton from "@/components/ui/skeletons/table-content-skeleton";

export default function CartLoadingPage() {
  return (
    <div className="grid grid-cols-3 gap-16">
      <div className="col-span-2">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-28" />
        </div>
        <Separator className="my-2" />
        <TableContentSkeleton />
      </div>
      <div className="col-span-1">
        <Skeleton className="h-[226px] max-w-[400px]" />
      </div>
    </div>
  );
}
