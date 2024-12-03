'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ShieldCheck, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import PaymentErrorBoundary from '@/app/components/payment/PaymentErrorBoundary';
import { formatCurrency } from '@/app/utils/format';
import { motion } from 'framer-motion';

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleInitiatePayment = async () => {
    try {
      if (!items?.length) {
        toast.error('No hay items en el carrito');
        return;
      }

      setIsProcessing(true);

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            _id: item._id,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity),
          })),
          buyer: {
            id: session?.user?.id,
            email: session?.user?.email,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pago');
      }

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('No se recibió la URL de pago');
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Error al procesar el pago. Por favor intente nuevamente.',
      );
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirección si el carrito está vacío
  if (!items?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            No hay productos en el carrito
          </h2>
          <Link href="/cart">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Volver al carrito
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PaymentErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header con navegación y logos */}
          <div className="mb-8 flex items-center justify-between">
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <ChevronLeft className="h-5 w-5" />
                Volver al carrito
              </motion.button>
            </Link>

            <div className="flex items-center gap-4">
              <Image
                src="/payment/mercadopago.webp"
                alt="Mercado Pago"
                width={100}
                height={30}
                className="rounded-md"
              />
              <div className="h-6 w-px bg-gray-200" />
              <Image
                src="/maria-pancha-logo.jpg"
                alt="Maria Pancha"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mx-auto max-w-3xl">
              {/* Encabezado */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Resumen de tu Pedido
                </h1>
                <p className="mt-2 text-gray-600">
                  Verifica los detalles antes de continuar
                </p>
              </div>

              {/* Lista de productos */}
              <div className="mb-8">
                {items.map((item) => (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex justify-between border-b py-4 last:border-0"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-16 w-16">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Talla: {item.size} | Cantidad: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Resumen de costos */}
              <div className="mb-8 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Impuestos incluidos
                  </p>
                </div>
              </div>

              {/* Botón de pago */}
              <motion.button
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                onClick={handleInitiatePayment}
                disabled={isProcessing}
                className="w-full rounded-full bg-purple-600 py-4 font-medium text-white shadow-lg transition-all hover:bg-purple-700 disabled:opacity-50"
              >
                {isProcessing ? 'Procesando...' : 'Proceder al Pago'}
              </motion.button>

              {/* Información de seguridad */}
              <div className="mt-8 flex justify-center gap-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  Pago Seguro SSL
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  Transacción Protegida
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PaymentErrorBoundary>
  );
}
