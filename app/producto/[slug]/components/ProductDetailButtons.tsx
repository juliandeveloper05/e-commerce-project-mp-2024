'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { toast } from 'react-hot-toast';
import type { Product } from '@/app/types/product';

interface ProductDetailButtonsProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  isAddingToCart: boolean;
  setIsAddingToCart: (value: boolean) => void;
}

const ProductDetailButtons = ({
  product,
  selectedSize,
  quantity,
  isAddingToCart,
  setIsAddingToCart,
}: ProductDetailButtonsProps) => {
  const { addItem } = useCart();
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
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
      toast.success('¡Producto agregado al carrito!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <motion.button
        whileHover={{ scale: !selectedSize ? 1 : 1.02 }}
        whileTap={{ scale: !selectedSize ? 1 : 0.98 }}
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
      </motion.button>

      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsAddingToWishlist(true);
            setTimeout(() => {
              setIsAddingToWishlist(false);
              toast.success('¡Producto guardado en favoritos!');
            }, 1000);
          }}
          disabled={isAddingToWishlist}
          className="flex h-14 flex-1 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
        >
          <Heart className="mr-2 h-5 w-5" />
          {isAddingToWishlist ? 'Guardando...' : 'Guardar'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-14 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: product.name,
                text: `¡Mira estas pantuflas! ${product.name}`,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              toast.success('¡Link copiado al portapapeles!');
            }
          }}
        >
          <Share2 className="mr-2 h-5 w-5" />
          Compartir
        </motion.button>
      </div>
    </div>
  );
};

export default ProductDetailButtons;
