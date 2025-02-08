'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import Link from 'next/link';
export default function PaginaExitoPedido() {
  const { clearCart } = useCart();
  const router = useRouter();
  useEffect(() => {
    // Limpiar el carrito cuando se carga la página de éxito
    clearCart();
  }, [clearCart]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-xl"
        >
          <div className="text-center">
            {/* Ícono de Éxito /}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
            >
              <CheckCircle className="h-10 w-10 text-green-500" />
            </motion.div>
            {/ Mensaje de Éxito */}
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              ¡Tu Pedido ha sido Enviado!
            </h1>

            <p className="mb-8 text-gray-600">
              Hemos recibido tu pedido correctamente. Por favor, continúa la
              conversación en WhatsApp para coordinar el pago y la entrega con
              la vendedora.
            </p>
            {/* Botones de Acción */}
            <div className="flex flex-col gap-4">
              <Link href="/productos">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-white transition-all hover:bg-purple-700"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Ver más productos
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-purple-200 px-6 py-3 text-purple-600 transition-all hover:bg-purple-50"
                >
                  <Home className="h-5 w-5" />
                  Volver al inicio
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
