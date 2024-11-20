'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import Loading from '../components/Loading/loadingPage';

const LoginPage = () => {
  // Estados y hooks
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para redirección si está autenticado
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Handler para inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: false,
      });

      if (result?.error) {
        setError(
          'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.',
        );
        toast.error('Error al iniciar sesión');
      } else if (result?.url) {
        toast.success('¡Inicio de sesión exitoso!');
        router.push(result.url);
      }
    } catch (error) {
      setError('Error inesperado. Por favor, inténtalo más tarde.');
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (status === 'loading' || isLoading) {
    return <Loading />;
  }

  // Componente principal
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header con gradiente y logo */}
        <div className="relative h-32 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/maria-pancha-logo.jpg"
              alt="Maria Pancha Logo"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
              priority
            />
          </div>
        </div>

        <CardContent className="bg-white p-8">
          {/* Título y descripción */}
          <CardHeader className="mb-8 p-0">
            <CardTitle className="text-center text-3xl font-extrabold text-gray-900">
              Bienvenido a Maria Pancha
            </CardTitle>
          </CardHeader>

          {/* Mensaje de error si existe */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Botones de inicio de sesión */}
          <div className="space-y-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-md border border-transparent bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                <Mail className="h-5 w-5" />
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión con Gmail'}
              </Button>
            </motion.div>
          </div>

          {/* Footer con términos y condiciones */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Al iniciar sesión, aceptas nuestros{' '}
            <Link
              href="/terms-and-conditions"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Términos y Condiciones
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
