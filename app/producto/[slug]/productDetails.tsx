'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import ProductDetailsCarousel from './components/ProductDetailsCarousel';
import Loading from '@/app/components/Loading/Loading';
import { useCart } from '@/app/context/CartContext';
import { formatCurrency } from '@/app/utils/format';
import type { Product } from '../../types/product';
import Link from 'next/link';

interface ProductDetailsProps {
  slug: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  // Estados locales
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  // Hooks
  const router = useRouter();
  const { addItem } = useCart();
  const {
    data: product,
    error,
    isLoading,
  } = useSWR<Product>(`/api/products/${slug}`, fetcher);

  // Efecto para reiniciar estados cuando cambia el producto
  useEffect(() => {
    setSelectedSize('');
    setQuantity(1);
  }, [slug]);

  // Manejadores
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
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
      toast.success('¡Producto agregado al carrito!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error al agregar al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleShareProduct = async () => {
    const shareData = {
      title: product?.name || 'Producto Maria Pancha',
      text: `¡Mira estas pantuflas! ${product?.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('¡Link copiado al portapapeles!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Error al compartir el producto');
    }
  };

  const handleAddToWishlist = () => {
    setIsAddingToWishlist(true);
    setTimeout(() => {
      setIsAddingToWishlist(false);
      toast.success('¡Producto guardado en favoritos!');
    }, 1000);
  };

  // Estados de carga y error
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Botón Volver */}
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
          {/* Galería de imágenes */}
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

          {/* Información del producto */}
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

            {/* Selector de cantidad */}
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
                <span className="w-12 text-center text-lg font-medium">
                  {quantity}
                </span>
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

            {/* Botones de acción */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: !selectedSize ? 1 : 1.02 }}
                whileTap={{ scale: !selectedSize ? 1 : 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize || isAddingToCart}
                className={`flex h-14 w-full items-center justify-center rounded-full px-6 text-base font-medium text-white shadow-lg transition-all
                  ${
                    !selectedSize
                      ? 'cursor-not-allowed bg-gray-400'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isAddingToCart
                  ? 'Agregando...'
                  : !selectedSize
                  ? 'Selecciona una talla'
                  : 'Agregar al Carrito'}
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShareProduct}
                  className="flex h-14 items-center justify-center rounded-full border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Compartir
                </motion.button>
              </div>
            </div>

            {/* Información adicional */}
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
  );
};

export default ProductDetails;
