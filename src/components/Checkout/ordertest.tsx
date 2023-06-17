export interface OrderObj {
    userId: string;
    totalprice: number;
    date:string;
    status:string;
    items: {
      
      orderquantity: number;
      
      productId:string;
    }[];
  }