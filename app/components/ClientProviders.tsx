'use client';

import { CartProvider } from '@/app/context/CartContext';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster position="bottom-right" />
      </CartProvider>
    </SessionProvider>
  );
}
