'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useSession } from 'next-auth/react';
import { formatCurrency } from '@/app/utils/format';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, ChevronLeft, Plus, Minus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CheckoutForm from '../cart/components/CheckoutForm';
import { useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const {
    items = [],
    itemCount = 0,
    total = 0,
    removeItem,
    updateQuantity,
  } = useCart();

  const handleQuantityChange = (
    id: string,
    size: string,
    currentQuantity: number,
    change: number,
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) {
      toast.error('La cantidad mínima es 1');
      return;
    }
    updateQuantity(id, size, newQuantity);
  };

  const handleProceedToCheckout = () => {
    if (!session) {
      toast.error('Debes iniciar sesión para continuar');
      router.push('/login');
      return;
    }
    setShowCheckoutForm(true); // Cambiamos esto para mostrar el formulario
  };

  // Si no hay sesión, mostrar mensaje de inicio de sesión
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Inicia sesión para ver tu carrito
          </h2>
          <p className="mb-8 text-gray-500">
            Los productos que agregues se guardarán para cuando vuelvas
          </p>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700"
            >
              Iniciar sesión
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  // Si el carrito está vacío
  if (!items?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Tu carrito está vacío
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
        {/* Encabezado */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tu Carrito ({itemCount}{' '}
              {itemCount === 1 ? 'producto' : 'productos'})
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Para {session.user?.name || session.user?.email}
            </p>
          </div>
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Lista de productos */}
          <div className="lg:col-span-8">
            <div className="rounded-lg bg-white shadow-lg">
              {items.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="border-b border-gray-200 p-4 last:border-b-0 sm:p-6"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 96px) 100vw, 96px"
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

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item._id, item.size)}
                          className="text-gray-400 transition-colors hover:text-red-500"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  item.size,
                                  item.quantity,
                                  -1,
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-purple-500 hover:text-purple-500"
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>

                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  item.size,
                                  item.quantity,
                                  1,
                                )
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-purple-500 hover:text-purple-500"
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <span className="text-sm text-gray-500">
                            {formatCurrency(item.price)} c/u
                          </span>
                        </div>

                        <p className="font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-lg">
              {showCheckoutForm ? (
                <CheckoutForm
                  items={items}
                  total={total}
                  userEmail={session.user?.email || ''}
                />
              ) : (
                <>
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
                        <p className="text-base font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-xl font-semibold text-gray-900">
                          {formatCurrency(total)}
                        </p>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        Para: {session.user?.name || session.user?.email}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProceedToCheckout}
                    className="mt-6 w-full rounded-full bg-purple-600 px-4 py-3 text-center font-medium text-white shadow-lg transition-all hover:bg-purple-700"
                  >
                    Proceder al pago
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
