export interface PaymentItem {
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentRequestBody {
  items: PaymentItem[];
  buyer: {
    email: string;
  };
}
