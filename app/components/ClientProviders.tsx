// app/components/ClientProviders.tsx
'use client';

import { CartProvider } from '@/app/context/CartContext';
import { FavoritesProvider } from '@/app/context/FavoritesContext';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  // Estado para controlar si estamos en el lado del cliente
  const [mounted, setMounted] = useState(false);

  // Efecto para manejar el montaje del cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita el error de hidratación esperando al montaje del cliente
  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider>
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
            <AnimatePresence mode="wait">{children}</AnimatePresence>

            <Toaster
              position="bottom-right"
              toastOptions={{
                // Estilo por defecto
                className: '',
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#363636',
                },
                // Estilos específicos por tipo de toast
                success: {
                  duration: 3000,
                  style: {
                    background: '#10b981',
                    color: '#fff',
                    border: '1px solid #10b981',
                  },
                },
                error: {
                  duration: 4000,
                  style: {
                    background: '#ef4444',
                    color: '#fff',
                    border: '1px solid #dc2626',
                  },
                },
                loading: {
                  duration: Infinity,
                  style: {
                    background: '#fff',
                    color: '#6366f1',
                    border: '1px solid #6366f1',
                  },
                },
              }}
              gutter={12}
              containerStyle={{
                top: 40,
                right: 20,
              }}
              reverseOrder={false}
            />
          </div>
        </CartProvider>
      </FavoritesProvider>
    </SessionProvider>
  );
}

// HOCs para envolver componentes individuales
export function withFavorites<P extends object>(
  Component: React.ComponentType<P>,
) {
  return function WithFavoritesComponent(props: P) {
    return (
      <FavoritesProvider>
        <Component {...props} />
      </FavoritesProvider>
    );
  };
}

export function withCart<P extends object>(Component: React.ComponentType<P>) {
  return function WithCartComponent(props: P) {
    return (
      <CartProvider>
        <Component {...props} />
      </CartProvider>
    );
  };
}

export function withSession<P extends object>(
  Component: React.ComponentType<P>,
) {
  return function WithSessionComponent(props: P) {
    return (
      <SessionProvider>
        <Component {...props} />
      </SessionProvider>
    );
  };
}
