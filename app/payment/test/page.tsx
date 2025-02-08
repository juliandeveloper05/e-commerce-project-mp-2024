'use client';

import { useState } from 'react';

export default function TestPaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleBuyClick() {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Pantufla de prueba',
          unit_price: 100,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Pantufla de Prueba
        </h1>

        <div className="mb-8">
          <p className="mb-2 text-lg font-medium text-gray-900">Precio: $100</p>
          <p className="text-gray-600">
            Producto de prueba para validar la integración con Mercado Pago
          </p>
        </div>

        <button
          onClick={handleBuyClick}
          disabled={isProcessing}
          className="w-full rounded-full bg-purple-600 px-6 py-3 text-white transition-all hover:bg-purple-700 disabled:opacity-50"
        >
          {isProcessing ? 'Procesando...' : 'Comprar Ahora'}
        </button>
      </div>
    </div>
  );
}
