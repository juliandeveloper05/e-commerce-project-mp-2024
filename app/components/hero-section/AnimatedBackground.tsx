'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo base con gradiente */}
      <div className="fixed inset-0 bg-gradient-radial from-purple-100/80 via-pink-100/80 to-transparent">
        {/* Elementos animados del fondo */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(600px circle at 0% 0%, rgba(147, 51, 234, 0.15), transparent 70%)',
              'radial-gradient(600px circle at 100% 100%, rgba(236, 72, 153, 0.15), transparent 70%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Círculos flotantes */}
        <motion.div
          className="absolute -left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-purple-400/30 blur-[80px]"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute -right-[15%] top-[40%] h-[700px] w-[700px] rounded-full bg-pink-400/30 blur-[100px]"
          animate={{
            x: [50, -50, 50],
            y: [30, -30, 30],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Efecto de luz rotativa */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-[60px]"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Puntos brillantes */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Patrón de puntos */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.5) 2px, transparent 2px),
              radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.5) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
