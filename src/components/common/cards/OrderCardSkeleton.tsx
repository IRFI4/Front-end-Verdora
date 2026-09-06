import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';

const OrderCardSkeleton = () => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="w-full">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex justify-between items-center gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex justify-between items-center gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-4 border-t">
        <Skeleton className="h-10 w-32.5 rounded-md" />
        <Skeleton className="h-10 w-32.5 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default OrderCardSkeleton;
