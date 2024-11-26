'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, ChevronLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CartItem } from '../types/product';

// Definimos el componente CartItemCard para mejor organización
const CartItemCard = ({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: (id: string, size: string) => void;
  onUpdateQuantity: (id: string, size: string, quantity: number) => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
    transition={{ duration: 0.2 }}
    className="border-b border-gray-200 p-4 last:border-b-0 sm:p-6"
  >
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      <div className="relative aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={item.imageSrc}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 96px"
          priority
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">Talla: {item.size}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(item._id, item.size)}
            className="ml-4 text-gray-400 transition-colors hover:text-red-500"
            aria-label="Eliminar producto"
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-gray-200">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  onUpdateQuantity(
                    item._id,
                    item.size,
                    Math.max(1, item.quantity - 1),
                  )
                }
                className="flex h-8 w-8 items-center justify-center border-r text-gray-600 hover:bg-gray-50"
              >
                -
              </motion.button>
              <span className="flex h-8 w-12 items-center justify-center text-sm">
                {item.quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  onUpdateQuantity(item._id, item.size, item.quantity + 1)
                }
                className="flex h-8 w-8 items-center justify-center border-l text-gray-600 hover:bg-gray-50"
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
);

export default function CartPage() {
  const {
    items = [],
    itemCount = 0,
    total = 0,
    removeItem,
    updateQuantity,
  } = useCart() || {};

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemoveItem = (id: string, size: string) => {
    removeItem(id, size);
    toast.success('Producto eliminado del carrito', {
      id: `remove-${id}-${size}`, // ID único evita duplicados
      position: 'bottom-right',
      duration: 2000,
    });
  };

  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) {
      toast.error('La cantidad debe ser al menos 1', {
        id: `quantity-error-${id}-${size}`,
      });
      return;
    }
    updateQuantity(id, size, quantity);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Redirigiendo al pago...', {
        id: 'checkout-success',
      });
      // Aquí iría la lógica de redirección al checkout
    } catch (error) {
      toast.error('Error al procesar el pago', {
        id: 'checkout-error',
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

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
              Volver a productos
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
            Tu Carrito ({itemCount} {itemCount === 1 ? 'producto' : 'productos'}
            )
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-lg bg-white shadow-lg">
              <AnimatePresence mode="wait">
                {items.map((item) => (
                  <CartItemCard
                    key={`${item._id}-${item.size}`}
                    item={item}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-4">
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
                  <p className="mt-1 text-sm text-gray-500">
                    Impuestos incluidos
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: isCheckingOut ? 1 : 1.02 }}
                whileTap={{ scale: isCheckingOut ? 1 : 0.98 }}
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="mt-6 w-full rounded-full bg-purple-600 px-4 py-3 text-center font-medium text-white shadow-lg transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCheckingOut ? 'Procesando...' : 'Proceder al pago'}
              </motion.button>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <p className="mb-2 text-sm text-gray-500">
                  Métodos de pago aceptados:
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src="/payment/mercadopago.webp"
                    alt="Mercado Pago"
                    width={60}
                    height={36}
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
