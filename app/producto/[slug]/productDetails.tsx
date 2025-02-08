'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { ArrowLeft, ShoppingCart, Share2, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import ProductDetailsCarousel from './components/ProductDetailsCarousel';
import Loading from '@/app/components/Loading/Loading';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useCart } from '@/app/context/CartContext';
import { formatCurrency } from '@/app/utils/format';
import type { Product } from '../../types/product';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al cargar el producto');
  return res.json();
};

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const router = useRouter();
  const { addItem } = useCart();
  const { data: session } = useSession();

  const {
    data: product,
    error,
    isLoading,
  } = useSWR<Product>(`/api/products/${slug}`, fetcher);

  useEffect(() => {
    setSelectedSize('');
    setQuantity(1);
  }, [slug]);

  const handleAuthRequired = () => {
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span>Debes iniciar sesión para agregar al carrito</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              router.push('/login');
            }}
            className="rounded-lg bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
          >
            Iniciar sesión
          </button>
        </div>
      ),
      {
        duration: 4000,
        position: 'bottom-right',
      },
    );
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    if (!session) {
      handleAuthRequired();
      return;
    }

    if (!product) return;

    setIsAddingToCart(true);
    try {
      await addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        imageSrc: product.imageSrc,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: 'Mira este producto en Maria Pancha',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado al portapapeles');
    }
  };

  if (isLoading) return <Loading />;
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Error al cargar el producto
        </h2>
        <button
          onClick={() => router.refresh()}
          className="rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/productos">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver a productos
            </motion.button>
          </Link>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Carrusel de imágenes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8 lg:mb-0"
            >
              <ProductDetailsCarousel
                mainImage={product.imageSrc}
                images={product.imageSwiper || []}
                name={product.name}
              />
            </motion.div>

            {/* Detalles del producto */}
            <div className="lg:pl-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="mt-4 text-4xl font-semibold text-purple-600">
                  {formatCurrency(product.price)}
                </p>
                {product.description && (
                  <p className="mt-4 text-lg text-gray-500">
                    {product.description}
                  </p>
                )}
              </motion.div>

              {/* Selector de talla */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Talla</h3>
                  <span className="text-sm text-gray-500">
                    Selecciona tu talla
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {['Chico', 'Mediano', 'Grande'].map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-[60px] items-center justify-center rounded-full border-2 text-sm font-medium transition-all
                        ${
                          selectedSize === size
                            ? 'border-purple-500 bg-purple-50 text-purple-600'
                            : 'border-gray-200 text-gray-900 hover:border-purple-300 hover:bg-purple-50'
                        }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Selector de cantidad */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900">Cantidad</h3>
                <div className="mt-4 flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
                  >
                    <Minus className="h-5 w-5" />
                  </motion.button>

                  <span className="w-12 text-center text-lg font-medium">
                    {quantity}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:gap-4">
                {!selectedSize ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      toast.error('Por favor selecciona una talla')
                    }
                    className="flex h-[60px] w-full items-center justify-center gap-2 rounded-full bg-gray-400 px-6 text-base font-medium text-white shadow-lg transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Selecciona una talla</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: isAddingToCart ? 1 : 1.02 }}
                    whileTap={{ scale: isAddingToCart ? 1 : 0.98 }}
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`flex h-[60px] w-full items-center justify-center gap-2 rounded-full px-6 text-base font-medium shadow-lg transition-all sm:flex-1
                      ${
                        isAddingToCart
                          ? 'cursor-not-allowed bg-gray-400 text-white'
                          : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-200'
                      }
                      group overflow-hidden`}
                  >
                    <ShoppingCart className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110" />
                    <span className="transition-transform duration-200 group-hover:-translate-y-1">
                      {isAddingToCart ? 'Agregando...' : 'Agregar al Carrito'}
                    </span>
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShare}
                  className="group flex h-[60px] w-full items-center justify-center gap-2 rounded-full border-2 border-purple-200 bg-white px-6 text-base font-medium text-purple-600 shadow-sm transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md sm:w-auto"
                >
                  <Share2 className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
                  <span>Compartir</span>
                </motion.button>
              </div>

              {/* Detalles adicionales */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="prose prose-sm max-w-none text-gray-500">
                  <h3 className="text-lg font-medium text-gray-900">
                    Detalles del producto
                  </h3>
                  <ul className="mt-4 list-disc pl-5">
                    <li>Material de alta calidad</li>
                    <li>Suela antideslizante</li>
                    <li>Diseño exclusivo</li>
                    <li>Fabricación artesanal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetails;
