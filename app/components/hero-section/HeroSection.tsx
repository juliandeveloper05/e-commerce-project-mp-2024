'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  const [isHoveredCTA, setIsHoveredCTA] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainContent = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const imageAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Fondo animado con patrones modernos */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, purple 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, pink 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* Contenido principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center lg:flex-row lg:justify-between lg:gap-12">
          {/* Texto y botones */}
          <motion.div
            variants={mainContent}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-xl text-center lg:text-left"
          >
            <h1 className="space-y-2">
              <motion.span
                className="block text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Abraza la calidez,
              </motion.span>
              <motion.span
                className="block text-3xl font-bold text-purple-600 sm:text-4xl lg:text-5xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                escapa del frío con
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
                  MP PANTUFLONES
                </span>
              </motion.div>
            </h1>

            <motion.p
              className="mt-6 text-lg text-gray-600 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Suaves, calentitas y con tus personajes favoritos. Descubre
              nuestra colección de pantuflas artesanales diseñadas para esos
              momentos de relax en casa. Llena de color y alegría tus pasos con
              nuestras pantuflas animadas confeccionadas con los mejores
              materiales.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link href="/#primer-producto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-xl"
                  onMouseEnter={() => setIsHoveredCTA(true)}
                  onMouseLeave={() => setIsHoveredCTA(false)}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Ver Colección
                    <ArrowRight
                      className={`ml-2 transition-transform duration-300 ${
                        isHoveredCTA ? 'translate-x-1' : ''
                      }`}
                    />
                  </span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center rounded-full border-2 border-purple-600 px-8 py-4 text-lg font-semibold text-purple-600 transition-all hover:bg-purple-50 hover:shadow-lg"
              >
                <ShoppingBag className="mr-2" />
                Catálogo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Imagen principal con efectos */}
          <motion.div
            variants={imageAnimation}
            initial="hidden"
            animate="visible"
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative">
              {/* Círculo decorativo animado */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-30 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Contenedor de la imagen principal */}
              <motion.div
                className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-white shadow-2xl sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/hero-image.jpg"
                  alt="Maria Pancha Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Elementos decorativos flotantes */}
              <motion.div
                className="absolute -right-4 -top-4 rounded-full bg-white p-4 shadow-lg"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="block h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 rounded-full bg-white p-4 shadow-lg"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="block h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
