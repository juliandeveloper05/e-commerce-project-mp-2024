'use client';

import { CartProvider } from './context/CartContext';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: '',
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </CartProvider>
    </SessionProvider>
  );
}
