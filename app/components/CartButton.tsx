'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

const CartButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { itemCount = 0 } = useCart() || {};

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <motion.div
            initial={false}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-purple-600"
          >
            {itemCount}
          </motion.div>
        )}
      </div>
      <span className="text-sm font-medium">Mi Carrito</span>
    </motion.button>
  );
};

export default CartButton;