import { Skeleton } from "@/components/ui/skeleton";

export default function InputSkeleton() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
