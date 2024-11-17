import { useEffect } from 'react';
import type { Product } from '../types/ProductTypes';

export const useProductAnalytics = (product: Product | null) => {
  useEffect(() => {
    if (product) {
      // Aquí iría la lógica de analytics
      // Ejemplo con Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'view_item', {
          currency: 'USD',
          value: product.price,
          items: [
            {
              item_id: product._id,
              item_name: product.name,
              price: product.price,
            },
          ],
        });
      }
    }
  }, [product]);

  const trackAddToCart = (quantity: number, size: string) => {
    if (product && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: product.price * quantity,
        items: [
          {
            item_id: product._id,
            item_name: product.name,
            price: product.price,
            quantity,
            variant: size,
          },
        ],
      });
    }
  };

  return {
    trackAddToCart,
  };
};
