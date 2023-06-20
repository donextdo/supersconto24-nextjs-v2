export interface OrderItem {
  userId: string | null;
  orderId: string | null;
  orderNumber: string;
  totalprice: number;
  date: string;
  status: string;
  items: {
    productDetails: any;

    orderquantity: number;

    productId: string;
  }[];
}
