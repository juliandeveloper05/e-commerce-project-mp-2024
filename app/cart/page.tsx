'use client';

import { useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { ShoppingBag, Trash2, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/app/utils/format';
import { motion, AnimatePresence } from 'framer-motion';
import EmptyCart from '../cart/components/EmptyCart';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const {
    items = [],
    itemCount = 0,
    total = 0,
    removeItem,
    updateQuantity,
  } = useCart() || {};

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  // Handler para compartir producto
  const handleShare = async (item: any) => {
    try {
      const shareData = {
        title: 'Maria Pancha - Pantuflas',
        text: `¡Mira estas pantuflas! ${item.name}`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback para navegadores que no soportan Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success('¡Link copiado al portapapeles!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Error al compartir el producto');
    }
  };

  // Si el carrito está vacío, mostrar el nuevo componente EmptyCart
  if (!items?.length) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header del carrito */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            Tu Carrito ({itemCount} {itemCount === 1 ? 'producto' : 'productos'}
            )
          </h1>
          <Link href="/productos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Seguir comprando
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Lista de productos */}
          <div className="lg:col-span-8">
            <div className="rounded-lg bg-white shadow-lg">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={`${item._id}-${item.size}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="border-b border-gray-200 p-6 last:border-b-0"
                  >
                    <div className="flex gap-6">
                      {/* Imagen del producto */}
                      <motion.div
                        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 96px, 96px"
                        />
                      </motion.div>

                      {/* Detalles del producto */}
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Talla: {item.size}
                            </p>
                          </div>

                          {/* Botones de acción */}
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item._id, item.size)}
                              className="text-gray-400 transition-colors hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleShare(item)}
                              className="text-gray-400 transition-colors hover:text-purple-500"
                            >
                              <Share2 className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Control de cantidad y precio */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center rounded-lg border border-gray-200">
                              <motion.button
                                whileHover={{ backgroundColor: '#F3F4F6' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  updateQuantity(
                                    item._id,
                                    item.size,
                                    Math.max(1, item.quantity - 1),
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center border-r text-gray-600"
                              >
                                -
                              </motion.button>
                              <span className="flex h-8 w-12 items-center justify-center text-sm">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ backgroundColor: '#F3F4F6' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  updateQuantity(
                                    item._id,
                                    item.size,
                                    item.quantity + 1,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center border-l text-gray-600"
                              >
                                +
                              </motion.button>
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatCurrency(item.price)} c/u
                            </div>
                          </div>
                          <p className="text-lg font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Resumen del pedido */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-lg">
              <h2 className="text-lg font-medium text-gray-900">
                Resumen del pedido
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(total)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Envío</p>
                  <p className="font-medium text-green-600">Gratis</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(total)}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-3 text-center font-medium text-white shadow-lg transition-colors hover:bg-purple-700"
                >
                  Proceder al pago
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
