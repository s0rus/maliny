import { Skeleton } from "@/components/ui/skeleton";
import TableContentSkeleton from "./table-content-skeleton";

export default function TableWithHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-48" />
      </div>
      <TableContentSkeleton />
    </div>
  );
}
