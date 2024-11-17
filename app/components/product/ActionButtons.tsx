'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Send } from 'lucide-react';

// Interfaces
interface ShareOption {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  shareUrl: string;
  color: string;
}

interface ActionButtonsProps {
  onAddToCart: () => Promise<void>;
  onAddToWishlist: () => void;
  showShareMenu: boolean;
  onToggleShare: () => void;
  productUrl: string;
  isLoading?: boolean;
}

// Componente del menú de compartir
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

// Botón principal con animación
const AnimatedButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  className?: string;
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

// Componente principal ActionButtons
const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAddToCart,
  onAddToWishlist,
  showShareMenu,
  onToggleShare,
  productUrl,
  isLoading = false,
}) => {
  return (
    <div className="mt-8 flex flex-col space-y-4">
      {/* Botón Agregar al Carrito */}
      <AnimatedButton
        onClick={onAddToCart}
        disabled={isLoading}
        className="flex h-14 items-center justify-center rounded-full bg-purple-600 px-6 text-base font-medium text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        <span>{isLoading ? 'Agregando...' : 'Agregar al Carrito'}</span>
      </AnimatedButton>

      {/* Botones secundarios */}
      <div className="flex space-x-4">
        {/* Botón Wishlist */}
        <AnimatedButton
          onClick={onAddToWishlist}
          className="flex h-14 flex-1 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
        >
          <Heart className="mr-2 h-5 w-5" />
          <span>Guardar</span>
        </AnimatedButton>

        {/* Botón Compartir con Menú */}
        <div className="relative">
          <AnimatedButton
            onClick={onToggleShare}
            className="flex h-14 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
          >
            <Share2 className="mr-2 h-5 w-5" />
            <span>Compartir</span>
          </AnimatedButton>

          <AnimatePresence>
            {showShareMenu && <ShareMenu productUrl={productUrl} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
