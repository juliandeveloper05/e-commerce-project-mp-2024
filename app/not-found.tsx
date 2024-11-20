'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Home } from 'lucide-react';

export default function NotFound() {
  // Animación de los pasos de pantuflas
  const footstepVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [0.8, 1, 0.8],
      x: [-20, 0, 20, 0, -20],
      y: [0, -20, 0, 20, 0],
    },
  };

  // Posiciones de las pantuflas animadas
  const footstepsPositions = [
    { top: '15%', left: '60%', delay: 0 },
    { top: '25%', left: '65%', delay: 0.2 },
    { top: '20%', left: '35%', delay: 0.4 },
    { top: '30%', left: '40%', delay: 0.6 },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradientes animados */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl"
        />

        {/* Pantuflas animadas */}
        {footstepsPositions.map((position, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: position.top,
              left: position.left,
            }}
            initial="initial"
            animate="animate"
            variants={footstepVariants}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: position.delay,
              ease: 'easeInOut',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              className="fill-purple-600/40"
            >
              <path d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" />
            </svg>
          </motion.div>
        ))}

        {/* Partículas flotantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-purple-400/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10],
              x: [-10, 10],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Contenedor principal con padding responsivo */}
      <div className="relative flex min-h-screen flex-col pt-32 sm:pt-36 md:pt-40 lg:pt-32">
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-lg text-center">
            {/* Número 404 animado */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-7xl font-black text-purple-600 sm:text-8xl"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              404
            </motion.h1>

            {/* Título animado */}
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
            >
              ¡Ups! Página no encontrada
            </motion.h2>

            {/* Descripción con fade in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-md text-base text-gray-600 sm:text-lg"
            >
              Parece que te has perdido en el mundo de las pantuflas. No te
              preocupes, ¡tenemos muchos más productos esperándote!
            </motion.p>

            {/* Contenedor de botones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mb-12 flex w-full max-w-xs flex-col gap-4 sm:max-w-md sm:flex-row sm:justify-center"
            >
              {/* Botón Inicio */}
              <Link href="/" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl sm:w-auto"
                >
                  <Home className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Volver al Inicio
                </motion.button>
              </Link>

              {/* Botón Productos */}
              <Link href="/productos" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-full border-2 border-purple-600 px-8 py-3 text-sm font-medium text-purple-600 shadow-lg transition-all hover:bg-purple-50 hover:shadow-xl sm:w-auto"
                >
                  <ShoppingBag className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  Ver Productos
                </motion.button>
              </Link>
            </motion.div>

            {/* Texto de ayuda con fade in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8 text-sm text-gray-500"
            >
              ¿Necesitas ayuda? Contáctanos y te ayudaremos a encontrar lo que
              buscas
            </motion.p>

            {/* Sección de contacto del técnico */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="mx-auto max-w-sm overflow-hidden rounded-lg border border-purple-100 bg-white/50 p-6 backdrop-blur-sm"
            >
              {/* Contenido de contacto */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <p className="text-base text-gray-600">
                  ¿Quieres hablar con el técnico?
                </p>
                <Link
                  href="https://juliansoto-portfolio.vercel.app/es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg font-medium text-purple-600 transition-colors hover:text-purple-700"
                >
                  Julian Javier Soto
                </Link>
                <Link
                  href="tel:+5491130666369"
                  className="block text-base text-gray-600 transition-colors hover:text-purple-600"
                >
                  +54 9 11 3066-6369
                </Link>
              </motion.div>

              {/* Efecto de brillo en las esquinas */}
              <div className="absolute left-0 top-0 h-16 w-16 bg-gradient-to-br from-purple-400/20 to-transparent blur-lg" />
              <div className="absolute bottom-0 right-0 h-16 w-16 bg-gradient-to-tl from-pink-400/20 to-transparent blur-lg" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
