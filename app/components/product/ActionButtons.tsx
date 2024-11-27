'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Share2 } from 'lucide-react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Send } from 'lucide-react';
import { useAuthRequiredAction } from '@/app/hooks/useAuthRequiredAction';
import type { Product } from '@/app/types/product';
import { toast } from 'react-hot-toast';

interface ShareOption {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  shareUrl: string;
  color: string;
}

interface ActionButtonsProps {
  product: Product;
  onAddToCart: () => Promise<void>;
  onAddToFavorite: () => Promise<void>;
  isFavorite: boolean;
  isLoading: boolean;
  selectedSize: string;
  showShareMenu?: boolean;
  onToggleShare?: () => void;
  productUrl: string;
}

const ShareMenu: React.FC<{ productUrl: string }> = ({ productUrl }) => {
  const shareOptions: ShareOption[] = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      shareUrl: `https://wa.me/?text=${encodeURIComponent(
        `¡Mira este producto! ${productUrl}`,
      )}`,
      color: 'text-green-500',
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl,
      )}`,
      color: 'text-blue-600',
    },
    {
      name: 'Twitter',
      icon: FaXTwitter,
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        productUrl,
      )}`,
      color: 'text-black',
    },
    {
      name: 'Telegram',
      icon: Send,
      shareUrl: `https://t.me/share/url?url=${encodeURIComponent(productUrl)}`,
      color: 'text-blue-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute right-0 z-10 mt-2 w-48 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5"
    >
      {shareOptions.map((option) => (
        <motion.a
          key={option.name}
          href={option.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, x: 5 }}
          className="flex items-center space-x-3 rounded-lg px-4 py-2 text-sm transition-all hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            window.open(option.shareUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          <option.icon className={`h-5 w-5 ${option.color}`} />
          <span className="text-gray-700">{option.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

const ActionButtons = ({
  product,
  onAddToCart,
  onAddToFavorite,
  isFavorite,
  isLoading,
  selectedSize,
  showShareMenu = false,
  onToggleShare = () => {},
  productUrl,
}: ActionButtonsProps) => {
  const { isAuthenticated, handleAuthRequired } = useAuthRequiredAction();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      handleAuthRequired('agregar productos al carrito');
      return;
    }

    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    onAddToCart();
  };

  const handleFavorite = () => {
    if (!isAuthenticated) {
      handleAuthRequired('guardar productos en favoritos');
      return;
    }

    onAddToFavorite();
  };

  return (
    <div className="mt-8 flex flex-col space-y-4">
      <motion.button
        whileHover={{ scale: isAuthenticated && selectedSize ? 1.02 : 1 }}
        whileTap={{ scale: isAuthenticated && selectedSize ? 0.98 : 1 }}
        onClick={handleAddToCart}
        disabled={!isAuthenticated || !selectedSize || isLoading}
        className={`flex h-14 items-center justify-center rounded-full px-6 text-base font-medium text-white shadow-lg transition-all
          ${
            !isAuthenticated || !selectedSize
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {!isAuthenticated
          ? 'Debes iniciar sesión'
          : isLoading
          ? 'Agregando...'
          : !selectedSize
          ? 'Selecciona una talla'
          : 'Agregar al Carrito'}
      </motion.button>

      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: isAuthenticated ? 1.02 : 1 }}
          whileTap={{ scale: isAuthenticated ? 0.98 : 1 }}
          onClick={handleFavorite}
          disabled={!isAuthenticated}
          className={`flex h-14 flex-1 items-center justify-center rounded-full border-2
            ${
              !isAuthenticated
                ? 'cursor-not-allowed border-gray-300 opacity-60'
                : isFavorite
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
        >
          <Heart
            className={`mr-2 h-5 w-5 ${
              !isAuthenticated
                ? 'text-gray-400'
                : isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600'
            }`}
          />
          {!isAuthenticated
            ? 'Debes iniciar sesión'
            : isFavorite
            ? 'Guardado'
            : 'Guardar'}
        </motion.button>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggleShare}
            className="flex h-14 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Compartir
          </motion.button>

          <AnimatePresence>
            {showShareMenu && <ShareMenu productUrl={productUrl} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
