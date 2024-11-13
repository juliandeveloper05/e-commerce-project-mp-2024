'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const [buttonPosition, setButtonPosition] = useState<number>(16); // default gap of 4rem

  useEffect(() => {
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
      window.removeEventListener('scroll', updateButtonPosition);
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, []);

  return (
    <a
      href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
      target="_blank"
      rel="noopener noreferrer"
      style={{
        bottom: `${buttonPosition}px`,
      }}
      className={`
        group fixed right-8
        z-50 flex h-16 w-16 items-center
        justify-center rounded-full bg-green-500
        text-white transition-all duration-300
        ease-in-out hover:scale-110 hover:bg-green-600
        hover:shadow-lg
      `}
    >
      <div className="relative">
        {/* Efecto de pulso */}
        <div className="absolute -inset-2 animate-ping rounded-full bg-green-500 opacity-75"></div>

        {/* Icono de WhatsApp */}
        <MessageCircle className="relative h-8 w-8 text-white" />

        {/* Tooltip CHAT */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 transform rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          CHAT
        </span>
      </div>
    </a>
  );
};

export default WhatsAppButton;
