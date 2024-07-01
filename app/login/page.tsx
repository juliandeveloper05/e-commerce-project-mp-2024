'use client';

import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const LoginForm = () => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

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
            <a
              href="http://localhost:3000/login/terms-and-conditions"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Términos y Condiciones
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
