'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCatalog } from '@/app/contexts/CatalogContext';

const WhatsAppButton = () => {
  const [buttonPosition, setButtonPosition] = useState<number>(16);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCatalogOpen } = useCatalog();

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

    updateButtonPosition();
    window.addEventListener('scroll', updateButtonPosition, { passive: true });
    window.addEventListener('resize', updateButtonPosition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateButtonPosition);
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, []);

  // No mostrar el botón si el catálogo está abierto o el menú está abierto
  if (isMenuOpen || isCatalogOpen) {
    return null;
  }

  return (
    <motion.a
      href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      style={{ bottom: `${buttonPosition}px` }}
      className={`
        group fixed right-8
        z-50 flex h-16 w-16 items-center
        justify-center rounded-full bg-green-500
        text-white transition-all duration-300
        ease-in-out hover:bg-green-600
        hover:shadow-lg lg:flex
      `}
    >
      <div className="relative">
        <div className="absolute -inset-2 animate-ping rounded-full bg-green-500 opacity-75"></div>
        <MessageCircle className="relative h-8 w-8 text-white" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          CHAT
        </span>
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
