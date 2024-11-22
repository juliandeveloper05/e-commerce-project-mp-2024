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
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}
