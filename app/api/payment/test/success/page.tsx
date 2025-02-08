'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="rounded-xl bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-2xl font-bold text-green-600">
          ¡Pago Exitoso!
        </h1>
        <p className="mb-6 text-gray-600">
          Tu pago de prueba se ha procesado correctamente.
        </p>
        <Link
          href="/payment/test"
          className="inline-block rounded-full bg-purple-600 px-6 py-3 text-white transition-all hover:bg-purple-700"
        >
          Volver a la página de prueba
        </Link>
      </div>
    </div>
  );
}
