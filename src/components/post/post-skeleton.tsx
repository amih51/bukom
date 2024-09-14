import { Skeleton } from "@/components/ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="group/del flex flex-col border-t py-4 sm:border-l-0">
      <div className="flex flex-row sm:border-l-0">
        <div className="flex w-full flex-row overflow-hidden">
          <div className="flex items-center p-2">
            <Skeleton className="size-12 rounded-full" />
          </div>
          <div className="flex w-full flex-col overflow-hidden pl-2">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="mt-2 h-5 w-16" />
          </div>
        </div>
      </div>
      <div className="max-h-[50vh] min-h-16 overflow-scroll p-2 scrollbar">
        <Skeleton className="h-7 w-[300px]" />
      </div>
      <div className="flex flex-row gap-5 overflow-hidden pl-2">
        {/* Vote and Interaction Buttons Skeleton */}
        <Skeleton className="h-9 w-[108px]" />
        <Skeleton className="h-9 w-12" />
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  );
}
