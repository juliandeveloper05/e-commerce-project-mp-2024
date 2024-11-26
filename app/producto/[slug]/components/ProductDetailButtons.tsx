'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useFavorites } from '@/app/context/FavoritesContext';
import { toast } from 'react-hot-toast';
import type { Product } from '@/app/types/product';

interface ProductDetailButtonsProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  isAddingToCart: boolean;
  setIsAddingToCart: (value: boolean) => void;
}

// Componente de botón animado reutilizable
const AnimatedButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  className: string;
  children: React.ReactNode;
}> = ({ onClick, disabled, className, children }) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const ProductDetailButtons = ({
  product,
  selectedSize,
  quantity,
  isAddingToCart,
  setIsAddingToCart,
}: ProductDetailButtonsProps) => {
  const { addItem } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla', {
        id: 'size-selection-error',
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      await addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        imageSrc: product.imageSrc,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito', {
        id: 'add-to-cart-error',
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true);
    try {
      const isFavorite = favorites.some((fav) => fav._id === product._id);

      if (isFavorite) {
        await removeFromFavorites(product._id);
        toast.success('Producto eliminado de favoritos', {
          id: `remove-favorite-${product._id}`,
        });
      } else {
        await addToFavorites(product);
        toast.success('¡Producto guardado en favoritos!', {
          id: `add-favorite-${product._id}`,
        });
      }
    } catch (error) {
      console.error('Error managing wishlist:', error);
      toast.error('Error al gestionar favoritos', {
        id: 'wishlist-error',
      });
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `¡Mira estas pantuflas! ${product.name}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('¡Link copiado al portapapeles!', {
          id: 'share-success',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Error al compartir', {
        id: 'share-error',
      });
    }
  };

  const isFavorite = favorites?.some((fav) => fav._id === product._id);

  return (
    <div className="flex flex-col space-y-4">
      <AnimatedButton
        onClick={handleAddToCart}
        disabled={!selectedSize || isAddingToCart}
        className={`flex h-14 items-center justify-center rounded-full px-6 text-base font-medium text-white shadow-lg transition-all
          ${
            !selectedSize
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {isAddingToCart
          ? 'Agregando...'
          : !selectedSize
          ? 'Selecciona una talla'
          : 'Agregar al Carrito'}
      </AnimatedButton>

      <div className="flex space-x-4">
        <AnimatedButton
          onClick={handleAddToWishlist}
          disabled={isAddingToWishlist}
          className={`flex h-14 flex-1 items-center justify-center rounded-full border-2 px-6 text-base font-medium transition-all
            ${
              isFavorite
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
        >
          <Heart
            className={`mr-2 h-5 w-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
          {isAddingToWishlist
            ? 'Guardando...'
            : isFavorite
            ? 'Guardado'
            : 'Guardar'}
        </AnimatedButton>

        <AnimatedButton
          onClick={handleShare}
          className="flex h-14 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Compartir
        </AnimatedButton>
      </div>
    </div>
  );
};

export default ProductDetailButtons;
