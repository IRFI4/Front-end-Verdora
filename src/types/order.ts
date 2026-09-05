export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'CONFIRMED'
  | 'PENDING_PAYMENT'
  | 'SHIPPED'
  | 'CANCELLED';

export type OrderItems = {
  orderItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  subtotal: number;
};

export type Order = {
  orderId: number;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItems[];
  createdAt: string;
};

export interface UpdateOrderPayload {
  orderId: number;
  status: OrderStatus;
}
