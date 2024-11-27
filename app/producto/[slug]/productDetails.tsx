'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import ProductDetailsCarousel from './components/ProductDetailsCarousel';
import Loading from '@/app/components/Loading/Loading';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useCart } from '@/app/context/CartContext';
import { useFavorites } from '@/app/context/FavoritesContext';
import { formatCurrency } from '@/app/utils/format';
import ActionButtons from '../../components/product/ActionButtons';
import type { Product } from '../../types/product';

// Configuración de SWR y fetch
// Configuración de SWR y fetch
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al cargar el producto');
  return res.json();
};

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  retry: 3,
  errorRetryInterval: 1000,
  dedupingInterval: 60000,
};

// Componente de botón animado reutilizable
const AnimatedButton = ({
  onClick,
  disabled,
  className,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  className: string;
  children: React.ReactNode;
}) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </motion.button>
);

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const router = useRouter();
  const { addItem } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  const {
    data: product,
    error,
    isLoading,
  } = useSWR<Product>(`/api/products/${slug}`, fetcher);

  useEffect(() => {
    setSelectedSize('');
    setQuantity(1);
  }, [slug]);

  const handleAuthRequired = (action: string) => {
    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span>Debes iniciar sesión para {action}</span>
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
    if (!selectedSize || !product) {
      toast.error('Por favor selecciona una talla', {
        id: 'size-error',
      });
      return;
    }
    if (!selectedSize || !product) {
      toast.error('Por favor selecciona una talla');
      return;
    }

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
      toast.error('Error al agregar al carrito', {
        id: 'cart-error',
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!product) return;

    try {
      const isFavorite = favorites.some((fav) => fav._id === product._id);
      if (isFavorite) {
        await removeFromFavorites(product._id);
        toast.success('Eliminado de favoritos');
      } else {
        await addToFavorites(product);
        toast.success('Agregado a favoritos');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Error al procesar favoritos');
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

  const isFavorite = favorites.some((fav) => fav._id === product._id);

  // Schema para SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageSrc,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'ARS',
      availability: product.stock > 0 ? 'InStock' : 'OutOfStock',
    },
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Head>
          <title>{`${product.name} | Mi Tienda`}</title>
          <meta name="description" content={product.description} />
          <meta property="og:image" content={product.imageSrc} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
          />
        </Head>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/productos">
            <AnimatedButton
              onClick={() => {}}
              className="mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver a productos
            </AnimatedButton>
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
                    <AnimatedButton
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-14 items-center justify-center rounded-full border-2 text-sm font-medium transition-all
                        ${
                          selectedSize === size
                            ? 'border-purple-500 bg-purple-50 text-purple-600'
                            : 'border-gray-200 text-gray-900 hover:border-purple-500'
                        }`}
                    >
                      {size}
                    </AnimatedButton>
                  ))}
                </div>
              </div>

              {/* Selector de cantidad */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900">Cantidad</h3>
                <div className="mt-4 flex items-center space-x-4">
                  <AnimatedButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  >
                    -
                  </AnimatedButton>
                  <span className="w-12 text-center text-lg font-medium">
                    {quantity}
                  </span>
                  <AnimatedButton
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  >
                    +
                  </AnimatedButton>
                </div>
              </div>

              {/* Botones de acción */}
              <ActionButtons
                product={product}
                onAddToCart={handleAddToCart}
                onAddToFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
                isLoading={isAddingToCart}
                selectedSize={selectedSize}
                showShareMenu={showShareMenu}
                onToggleShare={() => setShowShareMenu(!showShareMenu)}
                productUrl={window.location.href}
              />

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
