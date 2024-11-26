'use client';

import { useState } from 'react';
import { useFavorites } from '@/app/context/FavoritesContext';
import { toast } from 'react-hot-toast';
import type { Product } from '@/app/types/product';

interface WishlistItem {
  productId: string;
  product: Product; // Add this
}

export const useWishlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToFavorites } = useFavorites();

  const addToWishlist = async (item: WishlistItem) => {
    setIsLoading(true);
    try {
      await addToFavorites(item.product); // Pass the full product object
      toast.success('Producto agregado a favoritos');
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Error al agregar a favoritos');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addToWishlist,
    isLoading,
  };
};
