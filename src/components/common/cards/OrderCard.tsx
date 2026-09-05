import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Package, XCircle, Eye, Loader2 } from 'lucide-react';
import type { Order } from '@/types/order';
import OrderStatusBadge from '@components/common/Badge/OrderStatusBadge';
import {
  formatOrderDate,
  formatOrderPrice,
  isOrderCancellable,
} from '@/utils/order.utils';
import React from 'react';

export interface OrderCardProps {
  order: Order;
  onCancelClick?: (order: Order) => void;
  onViewDetails?: (order: Order) => void;
  isCancelling?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onCancelClick,
  onViewDetails,
  isCancelling = false,
}) => {
  const cancellable = isOrderCancellable(order.status);
  const formattedDate = formatOrderDate(order.createdAt);
  const totalAmount = formatOrderPrice(order.totalPrice);
  const totalItemCount = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Card className="flex flex-col h-full bg-card border-border hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold tracking-tight">
              Order #{order.orderId}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {formattedDate}
            </CardDescription>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5 border border-border/50 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <Package
              className="size-4 text-primary shrink-0"
              aria-hidden="true"
            />
            <span>
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground mr-1.5">Total:</span>
            <span className="font-bold text-base text-foreground">
              {totalAmount}
            </span>
          </div>
        </div>

        <ul className="text-sm space-y-2 border-t border-border/40 pt-3">
          {order.items.slice(0, 3).map(item => (
            <li
              key={item.orderItemId}
              className="flex justify-between items-center gap-2 text-xs"
            >
              <span className="flex-1 truncate">
                <span className="font-semibold text-muted-foreground mr-1.5">
                  {item.quantity}×
                </span>
                <span className="text-foreground">{item.productName}</span>
              </span>
              <span className="font-medium text-foreground whitespace-nowrap">
                {formatOrderPrice(item.subtotal)}
              </span>
            </li>
          ))}
          {order.items.length > 3 && (
            <li className="text-xs text-muted-foreground pt-0.5">
              + {order.items.length - 3} more item
              {order.items.length - 3 > 1 ? 's' : ''}...
            </li>
          )}
        </ul>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2 pt-3 border-t border-border bg-muted/20">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails?.(order)}
          className="text-xs cursor-pointer gap-1.5"
          aria-label={`View details for order #${order.orderId}`}
        >
          <Eye className="size-3.5" aria-hidden="true" />
          <span>Details</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant={cancellable ? 'destructive' : 'secondary'}
            size="sm"
            disabled={!cancellable || isCancelling}
            onClick={() => onCancelClick?.(order)}
            className="text-xs cursor-pointer gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            title={
              cancellable
                ? 'Cancel this order'
                : 'Cancellation is only available for orders with Pending payment or Confirmed status'
            }
            aria-label={`Cancel order #${order.orderId}`}
          >
            {isCancelling ? (
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <XCircle className="size-3.5" aria-hidden="true" />
            )}
            <span>{isCancelling ? 'Cancelling...' : 'Cancel Order'}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
