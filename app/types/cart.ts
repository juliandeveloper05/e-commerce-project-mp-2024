export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imageSrc: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}
