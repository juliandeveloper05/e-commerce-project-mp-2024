import { useState } from 'react';
import { useFavorites } from '@/app/context/FavoritesContext';
import { Product } from '@/app/types/product';
import { toast } from 'react-hot-toast';

export const useProductFavorites = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const toggleFavorite = async (product: Product) => {
    if (isProcessing) return;

    setIsProcessing(true);
    console.log('Processing favorite toggle for product:', product._id);

    try {
      const isFavorite = favorites.some((fav) => fav._id === product._id);
      console.log('Current favorite status:', isFavorite);

      if (isFavorite) {
        console.log('Removing from favorites');
        removeFromFavorites(product._id);
        toast.success('Eliminado de favoritos');
      } else {
        console.log('Adding to favorites');
        addToFavorites(product);
        toast.success('Guardado en favoritos');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Error al procesar favoritos');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav._id === productId);
  };

  return {
    toggleFavorite,
    isFavorite,
    isProcessing,
  };
};
