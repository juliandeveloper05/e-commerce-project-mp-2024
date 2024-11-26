'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useFavorites } from '@/app/context/FavoritesContext';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritesGrid() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence>
        {favorites.map((product) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="group relative"
          >
            <Link href={`/producto/${product.slug}`}>
              <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromFavorites(product._id);
                    }}
                    className="absolute right-2 top-2 z-20 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  </motion.button>
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-purple-600">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
