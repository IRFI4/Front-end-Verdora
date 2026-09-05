import type { Order } from '@/types/order';

export const CANCELLABLE_STATUSES: readonly string[] = [
  'PENDING',
  'PENDING_PAYMENT',
  'PAID',
  'CONFIRMED',
];

export const isOrderCancellable = (status?: string | null): boolean => {
  if (!status) return false;
  return CANCELLABLE_STATUSES.includes(status.trim().toUpperCase());
};

export const formatOrderDate = (
  dateStr?: string | Date | null,
  includeTime = true
): string => {
  if (!dateStr) return '';
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(includeTime
      ? {
          hour: '2-digit',
          minute: '2-digit',
        }
      : {}),
  });
};

export const formatOrderPrice = (price?: number | null): string => {
  if (typeof price !== 'number' || isNaN(price)) return '$0.00';
  return `$${price.toFixed(2)}`;
};

export const sortOrdersNewestFirst = (orders: Order[]): Order[] => {
  return [...orders].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeB - timeA;
  });
};
