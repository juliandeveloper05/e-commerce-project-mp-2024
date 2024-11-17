'use client';

import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductGridProps } from '../../types/product';
import { ShoppingCart, Heart } from 'lucide-react';

const InnovativeProductGrid: React.FC<ProductGridProps> = memo(
  ({ products }) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

    // Animaciones y variantes
    const containerVariants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3,
        },
      },
    };

    const itemVariants = {
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.9,
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          bounce: 0.4,
        },
      },
    };

    // Handlers para hover
    const handleHoverStart = useCallback((id: string) => {
      setHoveredItem(id);
    }, []);

    const handleHoverEnd = useCallback(() => {
      setHoveredItem(null);
    }, []);

    // Handler para añadir al carrito
    const handleAddToCart = useCallback(async (productId: string) => {
      setIsLoading(true);
      try {
        // Aquí iría la lógica para añadir al carrito
        console.log('Añadiendo al carrito:', productId);
      } catch (error) {
        console.error('Error al añadir al carrito:', error);
      } finally {
        setIsLoading(false);
      }
    }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
        {/* Círculos decorativos animados */}
        <motion.div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-64 w-64 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Título de la sección */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-4xl font-bold text-gray-800"
        >
          Nuestra Colección
        </motion.h1>

        {/* Grid de productos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative"
                onHoverStart={() => handleHoverStart(product._id)}
                onHoverEnd={handleHoverEnd}
                layout
              >
                <Link
                  href={`/producto/${product.slug}`}
                  className="block"
                  onClick={(e) => {
                    // Permitir la navegación solo si no se hizo clic en el botón de favoritos
                    if ((e.target as HTMLElement).closest('button')) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
                    {/* Efecto de máscara circular */}
                    <motion.div
                      className="absolute inset-0 z-10 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                      initial={false}
                      animate={{
                        opacity: hoveredItem === product._id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Imagen del producto */}
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />

                      {/* Botón de favoritos */}
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFavorites((prev) => ({
                            ...prev,
                            [product._id]: !prev[product._id],
                          }));
                        }}
                        className="absolute right-2 top-2 z-20 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart
                          className={`h-5 w-5 transition-all duration-300 ${
                            favorites[product._id]
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600 hover:text-red-500'
                          }`}
                        />
                      </motion.button>
                    </div>

                    {/* Información del producto */}
                    <motion.div
                      className="mt-4 space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-purple-600">
                          ${product.price.toLocaleString()}
                        </p>
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product._id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          disabled={isLoading}
                          className="rounded-full bg-purple-600 p-2 text-white shadow-lg transition-colors hover:bg-purple-700 disabled:opacity-50"
                        >
                          <ShoppingCart className="h-6 w-6" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje si no hay productos */}
        {products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-gray-600"
          >
            <p className="text-lg">
              No hay productos disponibles en este momento.
            </p>
          </motion.div>
        )}
      </div>
    );
  },
);

InnovativeProductGrid.displayName = 'InnovativeProductGrid';

export default InnovativeProductGrid;
