'use client';

import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';

export const useAddToCart = () => {
  const { addItem } = useCart();

  const handleAddToCart = async (
    product: Product,
    quantity: number,
    size: string,
  ) => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      imageSrc: product.imageSrc,
    };

    addItem(cartItem);
  };

  return { handleAddToCart };
};
