'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    const errorMessage = searchParams?.get('error');
    if (errorMessage) {
      setError(
        'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.',
      );
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setError(null);
    const result = await signIn('google', { callbackUrl: '/' });
    if (result?.error) {
      setError(
        'Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.',
      );
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden shadow-2xl">
        <div className="relative h-32 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/maria-pancha-logo.jpg"
              alt="Maria Pancha Logo"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
        <CardContent className="bg-white p-8">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
            Bienvenido a Maria Pancha
          </h2>
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-md border border-transparent bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <Mail className="h-5 w-5" />
              Iniciar sesión con Gmail
            </Button>
          </div>
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

export default LoginForm;
