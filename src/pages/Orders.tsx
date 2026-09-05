import { useState, useMemo } from 'react';
import LayoutPage from '@components/layout/pageLayout/LayoutPage';
import { Button } from '@components/ui/button';
import { useAllOrders, useCancelOrder } from '@api/order/order.hooks';
import type { Order } from '@/types/order';
import OrderCard from '@components/common/cards/OrderCard';
import OrderCardSkeleton from '@components/common/cards/OrderCardSkeleton';
import { PaginationComponent } from '@components/common/pagination/Pagination';
import { EmptySection } from '@components/common/section/EmptySection';
import ErrorSection from '@components/common/section/ErrorSection';
import AlertComponent from '@components/common/dialog/AlertComponent';
import OrderDetailsDialog from '@components/common/dialog/OrderDetailsDialog';
import { sortOrdersNewestFirst } from '@/utils/order.utils';
import {
  ShoppingBag,
  Package,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ORDERS_PER_PAGE = 12;

const Orders = () => {
  const {
    data: apiOrders,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useAllOrders();

  const cancelMutation = useCancelOrder();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<Order | null>(null);
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [cancelErrorNotice, setCancelErrorNotice] = useState<string | null>(
    null
  );

  const sortedOrders = useMemo(() => {
    return sortOrdersNewestFirst(apiOrders ?? []);
  }, [apiOrders]);

  const totalPages = Math.ceil(sortedOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = currentPage * ORDERS_PER_PAGE;
    return sortedOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [sortedOrders, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmCancel = () => {
    if (!cancellingOrder || cancelMutation.isPending) return;
    const targetOrderId = cancellingOrder.orderId;

    cancelMutation.mutate(targetOrderId, {
      onSuccess: () => {
        setCancellingOrder(null);
        setSuccessNotice(
          `Order #${targetOrderId} has been successfully cancelled.`
        );
        setCancelErrorNotice(null);

        if (selectedOrderDetails?.orderId === targetOrderId) {
          setSelectedOrderDetails(prev =>
            prev ? { ...prev, status: 'CANCELLED' } : null
          );
        }
      },
      onError: err => {
        const errorMsg =
          err?.response?.data?.message ||
          err?.message ||
          `Failed to cancel Order #${targetOrderId}. Please try again.`;
        setCancelErrorNotice(errorMsg);
      },
    });
  };

  return (
    <LayoutPage>
      <div className="w-full py-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border/60">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShoppingBag className="size-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Order History
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Track, review, and manage all your past and current purchases.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {sortedOrders.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {sortedOrders.length}{' '}
                {sortedOrders.length === 1 ? 'order' : 'orders'}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching || isLoading}
              className="cursor-pointer gap-2 text-xs"
              title="Refresh order history"
            >
              <RefreshCw
                className={`size-3.5 ${isRefetching ? 'animate-spin' : ''}`}
              />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {successNotice && (
          <div
            role="status"
            className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium">{successNotice}</span>
            </div>
            <button
              onClick={() => setSuccessNotice(null)}
              className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 cursor-pointer p-1"
              aria-label="Dismiss success notice"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {cancelErrorNotice && (
          <div
            role="alert"
            className="flex items-center justify-between rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span className="font-medium">{cancelErrorNotice}</span>
            </div>
            <button
              onClick={() => setCancelErrorNotice(null)}
              className="text-rose-700 hover:text-rose-900 dark:text-rose-400 cursor-pointer p-1"
              aria-label="Dismiss error notice"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <OrderCardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
            <ErrorSection
              title="Unable to load orders"
              message={
                error?.response?.data?.message ||
                error?.message ||
                'We were unable to retrieve your order history. Please check your connection and try again.'
              }
              onRetry={() => refetch()}
              retryText="Try Again"
            />
          </div>
        ) : sortedOrders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-12 shadow-xs">
            <EmptySection
              title="No orders yet"
              description="You have not placed any orders yet. Explore our green catalog and find something you love!"
              icon={
                <div className="flex items-center justify-center rounded-full bg-primary/10 p-4">
                  <Package
                    className="size-10 text-primary"
                    aria-hidden="true"
                  />
                </div>
              }
              action={
                <Button asChild variant="default">
                  <Link to="/products">Browse Catalog</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>
                Showing{' '}
                <strong className="text-foreground">
                  {currentPage * ORDERS_PER_PAGE + 1}
                </strong>{' '}
                to{' '}
                <strong className="text-foreground">
                  {Math.min(
                    (currentPage + 1) * ORDERS_PER_PAGE,
                    sortedOrders.length
                  )}
                </strong>{' '}
                of{' '}
                <strong className="text-foreground">
                  {sortedOrders.length}
                </strong>{' '}
                orders (Newest first)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedOrders.map(order => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  isCancelling={
                    cancelMutation.isPending &&
                    cancellingOrder?.orderId === order.orderId
                  }
                  onViewDetails={order => setSelectedOrderDetails(order)}
                  onCancelClick={order => {
                    setCancelErrorNotice(null);
                    cancelMutation.reset();
                    setCancellingOrder(order);
                  }}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pt-4 flex justify-center">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        )}

        <OrderDetailsDialog
          order={selectedOrderDetails}
          open={!!selectedOrderDetails}
          onOpenChange={open => {
            if (!open) setSelectedOrderDetails(null);
          }}
          isCancelling={
            cancelMutation.isPending &&
            cancellingOrder?.orderId === selectedOrderDetails?.orderId
          }
          onCancelClick={order => {
            setCancelErrorNotice(null);
            cancelMutation.reset();
            setCancellingOrder(order);
          }}
        />

        <AlertComponent
          title="Cancel Order"
          description={`Are you sure you want to cancel order #${cancellingOrder?.orderId}? This will stop your order from being processed.`}
          isAlertDialogOpen={!!cancellingOrder}
          onOpenChange={open => {
            if (!open) {
              setCancellingOrder(null);
              cancelMutation.reset();
            }
          }}
          actionText="Confirm Cancel Order"
          buttonText={<span className="hidden" />}
          loadingText="Cancelling..."
          isDeleting={cancelMutation.isPending}
          errorText={cancelMutation.error?.response?.data?.message}
          onAction={handleConfirmCancel}
        />
      </div>
    </LayoutPage>
  );
};

export default Orders;
