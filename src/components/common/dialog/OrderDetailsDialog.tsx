import React from 'react';
import type { Order } from '@/types/order';
import DialogComponent from '@components/common/dialog/DialogComponent';
import OrderStatusBadge from '@/components/common/Badge/OrderStatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  formatOrderDate,
  formatOrderPrice,
  isOrderCancellable,
} from '@/utils/order.utils';

type OrderDetailsDialogProps = {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelClick?: (order: Order) => void;
  isCancelling?: boolean;
};

export const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  order,
  open,
  onOpenChange,
  onCancelClick,
  isCancelling = false,
}) => {
  if (!order) return null;

  const cancellable = isOrderCancellable(order.status);

  return (
    <DialogComponent
      open={open}
      onOpenChange={onOpenChange}
      headerTitle={`Order #${order.orderId} Details`}
      headerDescription={`Placed on ${formatOrderDate(order.createdAt)}`}
      contentClassName="sm:max-w-xl"
      cancelText="Close"
      thirdActionText={
        cancellable && onCancelClick ? 'Cancel Order' : undefined
      }
      thirdActionDisabled={!cancellable || isCancelling}
      onThirdAction={() => {
        onCancelClick?.(order);
      }}
    >
      <div className="space-y-4 py-2">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
          <span className="text-sm font-medium">Order Status:</span>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="text-xs">Product</TableHead>
                <TableHead className="text-center text-xs">Qty</TableHead>
                <TableHead className="text-right text-xs">Unit Price</TableHead>
                <TableHead className="text-right text-xs">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map(item => (
                <TableRow key={item.orderItemId}>
                  <TableCell className="text-sm font-medium">
                    {item.productName}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatOrderPrice(item.priceAtPurchase)}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {formatOrderPrice(item.subtotal)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="font-semibold text-base">Total Amount:</span>
          <span className="font-bold text-lg text-primary">
            {formatOrderPrice(order.totalPrice)}
          </span>
        </div>
      </div>
    </DialogComponent>
  );
};

export default OrderDetailsDialog;
