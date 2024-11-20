import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  price: number;
}

export const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (item: CartItem) => {
    setIsLoading(true);
    try {
      // Aquí iría la lógica real de agregar al carrito
      // const response = await fetch('/api/cart', {
      //   method: 'POST',
      //   body: JSON.stringify(item)
      // });

      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Producto agregado al carrito');
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addToCart,
    isLoading,
  };
};
