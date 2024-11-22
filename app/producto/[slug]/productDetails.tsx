'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Send } from 'lucide-react';
import Loading from '@/app/components/Loading/Loading';
import { useCart } from '../../context/CartContext';
import type { Product } from '@/app/types/ProductTypes';

// Tipos e interfaces
interface ShareOption {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  shareUrl: string;
  color: string;
}

interface ProductDetailProps {
  slug: string;
}

// Fetcher para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductDetail: React.FC<ProductDetailProps> = ({ slug }) => {
  // Estados
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  // Hooks
  const router = useRouter();
  const { addItem } = useCart();

  // Fetch de datos del producto
  const {
    data: product,
    error,
    isLoading,
  } = useSWR<Product>(`/api/products/${slug}`, fetcher);

  // Effect para analytics
  useEffect(() => {
    if (product) {
      // Aquí puedes agregar tracking de vistas de producto
      console.log('Product view:', product.name);
    }
  }, [product]);

  // Opciones de compartir
  const getShareOptions = (productUrl: string): ShareOption[] => [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      shareUrl: `https://wa.me/?text=${encodeURIComponent(
        `¡Mira este producto! ${productUrl}`,
      )}`,
      color: 'text-green-500',
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl,
      )}`,
      color: 'text-blue-600',
    },
    {
      name: 'Twitter',
      icon: FaXTwitter,
      shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        productUrl,
      )}`,
      color: 'text-black',
    },
    {
      name: 'Telegram',
      icon: Send,
      shareUrl: `https://t.me/share/url?url=${encodeURIComponent(productUrl)}`,
      color: 'text-blue-400',
    },
  ];

  // Handlers
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    setIsAddingToCart(true);
    try {
      console.log('Adding to cart:', {
        _id: product!._id,
        name: product!.name,
        price: product!.price,
        quantity,
        size: selectedSize,
        imageSrc: product!.imageSrc,
      });

      addItem({
        _id: product!._id,
        name: product!.name,
        price: product!.price,
        quantity,
        size: selectedSize,
        imageSrc: product!.imageSrc,
      });

      // Opcional: redireccionar al carrito
      // router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true);
    try {
      // Aquí iría la lógica real de wishlist
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Producto guardado en favoritos');
    } catch (error) {
      toast.error('Error al guardar en favoritos');
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  // Loading state
  if (isLoading) return <Loading />;

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Error al cargar el producto
          </h2>
          <p className="text-gray-600">
            Por favor, intente nuevamente más tarde
          </p>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Producto no encontrado
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Galería de Imágenes */}
        <div className="relative mb-8 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
          >
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              className="h-full w-full object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Imágenes adicionales */}
          {product.imageSwiper && product.imageSwiper.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.imageSwiper.map((image, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Vista ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div className="lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-4 text-2xl font-medium text-purple-600">
              ${product.price.toLocaleString()}
            </p>
            {product.description && (
              <p className="mt-4 text-gray-600">{product.description}</p>
            )}
          </motion.div>

          {/* Selector de Talla */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900">Talla</h3>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {['Chico', 'Mediano', 'Grande'].map((size) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-14 items-center justify-center rounded-full border-2 text-sm font-medium transition-all
                    ${
                      selectedSize === size
                        ? 'border-purple-500 bg-purple-50 text-purple-600'
                        : 'border-gray-200 text-gray-900 hover:border-purple-500'
                    }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Selector de Cantidad */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900">Cantidad</h3>
            <div className="mt-4 flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                -
              </motion.button>
              <span className="text-lg font-medium">{quantity}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex h-14 items-center justify-center rounded-full bg-purple-600 px-6 text-base font-medium text-white shadow-lg transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isAddingToCart ? 'Agregando...' : 'Agregar al Carrito'}
            </motion.button>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToWishlist}
                disabled={isAddingToWishlist}
                className="flex h-14 flex-1 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Heart className="mr-2 h-5 w-5" />
                {isAddingToWishlist ? 'Guardando...' : 'Guardar'}
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex h-14 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Compartir
                </motion.button>

                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 z-10 mt-2 w-48 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                      {getShareOptions(
                        typeof window !== 'undefined'
                          ? window.location.href
                          : '',
                      ).map((option) => (
                        <motion.a
                          key={option.name}
                          href={option.shareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center space-x-3 rounded-lg px-4 py-2 text-sm transition-all hover:bg-gray-50"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              option.shareUrl,
                              '_blank',
                              'noopener,noreferrer',
                            );
                          }}
                        >
                          <option.icon className={`h-5 w-5 ${option.color}`} />
                          <span className="text-gray-700">{option.name}</span>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
