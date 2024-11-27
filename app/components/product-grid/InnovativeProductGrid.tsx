import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductGridProps } from '../../types/product';
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useFavorites } from '@/app/context/FavoritesContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FavoriteButton from '../../components/favoritos/FavoriteButton';

const InnovativeProductGrid: React.FC<ProductGridProps> = memo(
  ({ products }) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

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

    const handleHoverStart = useCallback((id: string) => {
      setHoveredItem(id);
    }, []);

    const handleHoverEnd = useCallback(() => {
      setHoveredItem(null);
    }, []);

    const handleAddToCart = useCallback(
      async (productId: string) => {
        if (!session) {
          toast(
            (t) => (
              <div className="flex items-center gap-3">
                <span>Debes iniciar sesión para comprar</span>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    router.push('/login');
                  }}
                  className="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
                >
                  Iniciar sesión
                </button>
              </div>
            ),
            {
              duration: 4000,
              position: 'bottom-right',
            },
          );
          return;
        }

        setIsLoading(true);
        try {
          // Aquí iría la lógica para agregar al carrito
          toast.success('Producto agregado al carrito');
        } catch (error) {
          console.error('Error al añadir al carrito:', error);
          toast.error('Error al agregar al carrito');
        } finally {
          setIsLoading(false);
        }
      },
      [session, router],
    );

    const handleFavoriteClick = useCallback(
      (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();

        if (!session) {
          toast(
            (t) => (
              <div className="flex items-center gap-3">
                <span>Debes iniciar sesión para guardar favoritos</span>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    router.push('/login');
                  }}
                  className="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
                >
                  Iniciar sesión
                </button>
              </div>
            ),
            {
              duration: 4000,
              position: 'bottom-right',
            },
          );
          return;
        }

        const isFavorite = favorites.some((fav) => fav._id === product._id);

        if (isFavorite) {
          removeFromFavorites(product._id);
          toast.success('Eliminado de favoritos');
        } else {
          addToFavorites(product);
          toast.success('Agregado a favoritos');
        }
      },
      [session, favorites, addToFavorites, removeFromFavorites, router],
    );

    function handleToggleFavorite(product: Product) {
      throw new Error('Function not implemented.');
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
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

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center text-4xl font-bold text-gray-800"
        >
          Nuestra Colección
        </motion.h1>

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
                    if ((e.target as HTMLElement).closest('button')) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
                    <motion.div
                      className="absolute inset-0 z-10 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                      initial={false}
                      animate={{
                        opacity: hoveredItem === product._id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={product.imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>

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
                          whileHover={session ? { scale: 1.1 } : {}}
                          whileTap={session ? { scale: 0.9 } : {}}
                          disabled={isLoading}
                          className={`rounded-full bg-purple-600 p-2 text-white shadow-lg transition-colors
                            ${
                              session
                                ? 'hover:bg-purple-700'
                                : 'cursor-not-allowed opacity-60'
                            } 
                            disabled:opacity-50`}
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
