'use client';

import { useCart } from '../context/CartContext';
import { ShoppingBag, Trash2, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '../utils/format';
import { motion } from 'framer-motion';

export default function CartPage() {
  const {
    items = [],
    itemCount = 0,
    total = 0,
    removeItem,
    updateQuantity,
  } = useCart() || {};

  if (!items?.length) {
    return (
      <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            El carrito está vacío
          </h2>
          <p className="mb-8 text-gray-600">
            Antes de continuar, necesitas agregar productos a tu carrito.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg bg-black px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
              >
                VOLVER A LA TIENDA
              </motion.button>
            </Link>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg bg-yellow-500 px-8 py-3 font-medium text-white hover:bg-yellow-600 sm:w-auto"
              >
                ACCEDER A LA CUENTA
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Tu Carrito ({itemCount} {itemCount === 1 ? 'producto' : 'productos'}
            )
          </h1>
          <Link href="/">
            <button className="text-sm text-purple-600 hover:text-purple-700">
              Seguir comprando
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-lg bg-white shadow">
              {items.map((item) => (
                <motion.div
                  key={`${item._id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border-b border-gray-200 p-6 last:border-b-0"
                >
                  <div className="flex gap-6">
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
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
                            className="text-gray-400 transition-colors hover:text-purple-500"
                          >
                            <Share2 className="h-5 w-5" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center rounded-lg border border-gray-200">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center border-r text-gray-600 hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="flex h-8 w-12 items-center justify-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.size,
                                  item.quantity + 1,
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center border-l text-gray-600 hover:bg-gray-50"
                            >
                              +
                            </button>
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
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow">
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
          </div>
        </div>
      </div>
    </div>
  );
}
