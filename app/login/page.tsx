'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.url) {
        toast.success('¡Inicio de sesión exitoso!');
        router.push(result.url);
      }
    } catch (error) {
      console.error('[Login] Error:', error);
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  // Animaciones para los elementos decorativos
  const decorativeElements = [
    { top: '10%', left: '10%', delay: 0 },
    { top: '20%', right: '15%', delay: 0.2 },
    { bottom: '15%', left: '20%', delay: 0.4 },
    { bottom: '25%', right: '10%', delay: 0.6 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Elementos decorativos */}
      {decorativeElements.map((style, index) => (
        <motion.div
          key={index}
          className="absolute h-32 w-32 rounded-full bg-white/30 backdrop-blur-lg"
          style={style}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: style.delay,
          }}
        />
      ))}

      {/* Patrones de fondo */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, purple 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Botón Volver */}
        <Link href="/productos">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a productos
          </motion.button>
        </Link>

        <div className="mt-8 flex min-h-[calc(100vh-200px)] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md space-y-12" // Aumentado el espaciado
          >
            {/* Logo y Título */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className="relative mx-auto mb-8 h-24 w-24 overflow-hidden rounded-full"
              >
                <Image
                  src="/maria-pancha-logo.jpg"
                  alt="Maria Pancha Logo"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  priority
                />
                {/* Halo decorativo alrededor del logo */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-200"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-3xl font-bold text-gray-900"
              >
                Accede a tu cuenta
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-600"
              >
                Y disfruta de todos nuestros productos
              </motion.p>
            </div>

            {/* Contenedor de botones con más espacio */}
            <div className="space-y-6">
              {' '}
              {/* Aumentado el espaciado entre botones */}
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-purple-600 px-6 py-4 text-base font-medium text-white shadow-lg transition-all hover:bg-purple-700 disabled:opacity-50"
              >
                <Mail className="h-5 w-5" />
                {isLoading ? 'Iniciando sesión...' : 'Continuar con Google'}
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <ChevronRight className="h-5 w-5 opacity-70" />
                </motion.div>
              </motion.button>
              <Link href="/" className="block">
                {' '}
                {/* Asegura que el enlace ocupe todo el ancho */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full border-2 border-gray-200 bg-white px-6 py-4 text-base font-medium text-gray-700 transition-all hover:border-purple-200 hover:bg-purple-50"
                >
                  Continuar como invitado
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
