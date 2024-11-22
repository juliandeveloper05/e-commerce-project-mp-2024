import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

const EmptyCart = () => {
  // Animación para las pantuflas "caminando"
  const slipperVariants = {
    initial: { x: -100, y: 0, opacity: 0 },
    animate: {
      x: 100,
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Animación para el contenedor principal
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Animación para los elementos decorativos flotantes
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-white p-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-xl"
      >
        {/* Elementos decorativos animados */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pantuflas animadas */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + i * 30}%`,
                left: 0,
              }}
              variants={slipperVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                className="fill-purple-300"
              >
                <path d="M20,50 Q50,20 80,50 Q50,80 20,50 Z" />
              </svg>
            </motion.div>
          ))}

          {/* Elementos decorativos flotantes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              className="absolute h-8 w-8 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              variants={floatingVariants}
              animate="animate"
              custom={i}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100"
          >
            <ShoppingBag className="h-14 w-14 text-purple-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-3xl font-bold text-gray-900"
          >
            ¡Tu carrito está vacío!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-lg text-gray-600"
          >
            Parece que aún no has elegido tus pantuflas favoritas. ¡Descubre
            nuestra colección única!
          </motion.p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group w-full rounded-full bg-purple-600 px-8 py-4 text-white transition-all hover:bg-purple-700 sm:w-auto"
              >
                <span className="flex items-center justify-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Explorar Productos
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
