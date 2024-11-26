'use client';

import { useEffect, useState } from 'react';
import { useFavorites } from '@/app/context/FavoritesContext';
import { formatCurrency } from '@/app/utils/format';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FavoritosPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!favorites?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Tu lista de favoritos está vacía
          </h2>
          <p className="mb-8 text-gray-500">
            ¿No sabes qué comprar? ¡Miles de productos te esperan!
          </p>
          <Link href="/productos">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Ver productos
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Mis Favoritos ({favorites.length}{' '}
            {favorites.length === 1 ? 'producto' : 'productos'})
          </h1>
          <Link href="/productos">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Seguir comprando
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {favorites.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative overflow-hidden rounded-xl bg-white p-4 shadow-lg"
              >
                <Link href={`/producto/${product.slug}`}>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                </Link>

                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-purple-600">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    removeFromFavorites(product._id);
                    toast.success('Producto eliminado de favoritos');
                  }}
                  className="absolute right-6 top-6 rounded-full bg-white/90 p-2 shadow-lg transition-colors hover:bg-red-50"
                >
                  <X className="h-5 w-5 text-red-500" />
                </motion.button>

                <Link href={`/producto/${product.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-purple-700"
                  >
                    <ShoppingBag className="mr-2 inline-block h-4 w-4" />
                    Ver detalles
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
