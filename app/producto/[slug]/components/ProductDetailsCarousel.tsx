'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductDetailsCarouselProps {
  mainImage: string;
  images: string[];
  name: string;
}

const ProductDetailsCarousel: React.FC<ProductDetailsCarouselProps> = ({
  mainImage,
  images,
  name,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [mainImage, ...images];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full"
          >
            <Image
              src={allImages[currentIndex]}
              alt={`${name} - Imagen ${currentIndex + 1}`}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {allImages.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {allImages.length > 1 && (
        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all 
                ${
                  currentIndex === index
                    ? 'border-purple-500'
                    : 'border-transparent hover:border-purple-300'
                }`}
            >
              <Image
                src={image}
                alt={`${name} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailsCarousel;
