import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';
import type { OrderStatus } from '@/types/order';
import { Clock, CheckCircle2, Truck, XCircle, HelpCircle } from 'lucide-react';
import React from 'react';

type OrderStatusBadgeProps = {
  status: OrderStatus | string;
  className?: string;
  showIcon?: boolean;
  format?: 'label' | 'raw';
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  className,
  showIcon = true,
  format = 'label',
}) => {
  const getOrderStatusLabel = (status?: string | null): string => {
    if (!status) return 'Unknown';
    switch (status.trim().toUpperCase()) {
      case 'PENDING':
      case 'PENDING_PAYMENT':
        return 'Pending payment';
      case 'PAID':
      case 'CONFIRMED':
        return 'Confirmed';
      case 'SHIPPED':
        return 'Shipped';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const normalizedStatus = (status || '').trim().toUpperCase();

  const isPending =
    normalizedStatus === 'PENDING' || normalizedStatus === 'PENDING_PAYMENT';
  const isConfirmed =
    normalizedStatus === 'PAID' || normalizedStatus === 'CONFIRMED';
  const isShipped = normalizedStatus === 'SHIPPED';
  const isCancelled = normalizedStatus === 'CANCELLED';

  const label =
    format === 'label' ? getOrderStatusLabel(status) : normalizedStatus;

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1.5 font-medium px-2.5 py-1 text-xs rounded-full border shadow-2xs transition-colors',
        {
          'text-amber-800 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800':
            isPending,
          'text-emerald-800 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800':
            isConfirmed,
          'text-blue-800 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800':
            isShipped,
          'text-rose-800 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800':
            isCancelled,
          'text-muted-foreground bg-muted border-border':
            !isPending && !isConfirmed && !isShipped && !isCancelled,
        },
        className
      )}
    >
      {showIcon && (
        <>
          {isPending && (
            <Clock className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          {isConfirmed && (
            <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          {isShipped && (
            <Truck className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          {isCancelled && (
            <XCircle className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          {!isPending && !isConfirmed && !isShipped && !isCancelled && (
            <HelpCircle className="size-3.5 shrink-0" aria-hidden="true" />
          )}
        </>
      )}
      <span>{label}</span>
    </Badge>
  );
};

export default OrderStatusBadge;
