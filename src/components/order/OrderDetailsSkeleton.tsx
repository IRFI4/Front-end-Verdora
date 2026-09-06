import { Skeleton } from '@components/ui/skeleton';

export const OrderDetailsSkeleton = () => {
  return (
    <div className="w-full py-8 space-y-6 animate-pulse">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div className="space-y-2">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-4 w-44" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-24 w-full rounded-xl" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-36 rounded-xl" />
        <Skeleton className="h-36 rounded-xl" />
        <Skeleton className="h-36 rounded-xl" />
      </div>

      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
};

export default OrderDetailsSkeleton;
