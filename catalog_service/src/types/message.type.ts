export type OrderLineItems = {
  id: number;
  productId: number;
  qty: number;
};

export interface OrderWithLineItems {
  id?: number;
  orderNumber: number;
  orderItems: OrderLineItems[];
}
