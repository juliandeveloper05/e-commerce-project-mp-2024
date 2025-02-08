'use client';

import { motion } from 'framer-motion';
import { CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-12">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-xl"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
            >
              <CheckCircle className="h-10 w-10 text-green-500" />
            </motion.div>

            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              ¡Pedido Recibido!
            </h1>

            <p className="mb-8 text-gray-600">
              Tu pedido ha sido enviado exitosamente. Por favor, continúa la
              conversación en WhatsApp para coordinar el pago con la vendedora.
            </p>

            <div className="mb-8 rounded-lg bg-purple-50 p-6 text-left">
              <h2 className="mb-4 font-medium text-purple-900">
                Próximos pasos:
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-200 text-xs font-bold text-purple-700">
                    1
                  </div>
                  <p className="text-sm text-gray-600">
                    Revisa tu correo electrónico para ver el resumen de tu
                    pedido
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-200 text-xs font-bold text-purple-700">
                    2
                  </div>
                  <p className="text-sm text-gray-600">
                    Coordina el método de pago con la vendedora a través de
                    WhatsApp
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-200 text-xs font-bold text-purple-700">
                    3
                  </div>
                  <p className="text-sm text-gray-600">
                    Una vez confirmado el pago, coordinarán el envío de tu
                    pedido
                  </p>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/productos">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-purple-600 px-8 py-3 font-medium text-white shadow-lg transition-all hover:bg-purple-700 sm:w-auto"
                >
                  Seguir comprando
                  <ArrowRight className="ml-2 inline-block h-4 w-4" />
                </motion.button>
              </Link>

              <a
                href="https://wa.me/5491126625292"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-green-500 px-8 py-3 font-medium text-green-600 transition-all hover:bg-green-50"
                >
                  <MessageSquare className="h-4 w-4" />
                  Abrir WhatsApp
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
