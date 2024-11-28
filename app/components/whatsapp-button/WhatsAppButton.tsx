'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [buttonPosition, setButtonPosition] = useState<number>(16);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalkingAway, setIsWalkingAway] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleMenuStateChange = () => {
      setIsMenuOpen(document.documentElement.style.overflow === 'hidden');
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          handleMenuStateChange();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    });

    const updateButtonPosition = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const buttonHeight = 96;

      if (footerRect.top <= viewportHeight) {
        const newPosition = Math.max(16, viewportHeight - footerRect.top + 16);
        setButtonPosition(newPosition);
      } else {
        setButtonPosition(16);
      }
    };

    if (pathname === '/contacto') {
      setIsWalkingAway(true);
      setTimeout(() => setIsWalkingAway(false), 4000); // Increased duration
    } else {
      setIsWalkingAway(true);
    }

    updateButtonPosition();
    window.addEventListener('scroll', updateButtonPosition, { passive: true });
    window.addEventListener('resize', updateButtonPosition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateButtonPosition);
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, [pathname]);

  const ChatBubble = () =>
    pathname === '/contacto' && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 1 }}
        className="absolute -top-16 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg"
      >
        ¡Adiós! 👋
      </motion.div>
    );

  const FootstepAnimation = () => (
    <motion.div
      className="absolute -bottom-4 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.5, repeat: 8, repeatType: 'reverse' }}
    >
      <div className="flex gap-2">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="h-2 w-1 rounded-full bg-green-300"
            animate={{
              y: [-2, 2],
              rotate: i === 0 ? [-20, 20] : [20, -20],
            }}
            transition={{
              duration: 0.5,
              repeat: 8,
              repeatType: 'reverse',
              delay: i * 0.25,
            }}
          />
        ))}
      </div>
    </motion.div>
  );

  if (isMenuOpen || (pathname === '/contacto' && !isWalkingAway)) {
    return null;
  }

  const walkingAnimation =
    pathname === '/contacto'
      ? {
          x: [-200, -400],
          y: [0, -200],
          opacity: [1, 0],
          transition: {
            duration: 4, // Slower exit animation
            ease: 'linear',
          },
        }
      : {};

  return (
    <AnimatePresence>
      <motion.a
        href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg"
        style={{ bottom: `${buttonPosition}px` }}
        animate={walkingAnimation}
        whileHover={pathname !== '/contacto' ? { scale: 1.1 } : undefined}
      >
        <div className="relative">
          <div className="absolute -inset-2 animate-ping rounded-full bg-green-500 opacity-75" />
          <MessageCircle className="relative h-8 w-8 text-white" />
          <ChatBubble />
          {pathname === '/contacto' && <FootstepAnimation />}
        </div>
      </motion.a>
    </AnimatePresence>
  );
};

export default WhatsAppButton;
