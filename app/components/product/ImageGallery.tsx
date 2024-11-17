'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  mainImage: string;
  images?: string[];
  productName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  mainImage,
  images = [], // Provide default empty array
  productName,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helpers and derived state
  const hasMultipleImages = Array.isArray(images) && images.length > 0;
  const currentImage = hasMultipleImages
    ? images[currentImageIndex]
    : mainImage;

  // Event handlers
  const handleNextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative">
      {/* Main Image Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
      >
        <Image
          src={currentImage}
          alt={`${productName} - Imagen ${currentImageIndex + 1}`}
          fill
          className="h-full w-full object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Navigation Buttons - Only show if there are multiple images */}
        {hasMultipleImages && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Thumbnails - Only show if there are multiple images */}
      {hasMultipleImages && (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {images.map((image, idx) => (
            <motion.button
              key={`thumb-${idx}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentImageIndex(idx)}
              className={`relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                currentImageIndex === idx
                  ? 'border-purple-500'
                  : 'border-transparent hover:border-purple-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - Vista previa ${idx + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
