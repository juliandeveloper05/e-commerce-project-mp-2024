'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ImageGallery } from '../../components/product/ImageGallery';
import { ProductInfo } from '../../components/product/ProductInfo';
import { SizeSelector } from '../../components/product/SizeSelector';
import { QuantitySelector } from '../../components/product/QuantitySelector';
import ActionButtons from '../../components/product/ActionButtons';
import Loading from '@/app/components/Loading/Loading';
import type { Product } from '../../types/ProductTypes';

// Definimos los tamaños disponibles
const SIZES = [
  { id: 'CH', label: 'Chico' },
  { id: 'MD', label: 'Mediano' },
  { id: 'GR', label: 'Grande' },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ slug }) => {
  // Estado local
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const router = useRouter();

  // Fetch de datos del producto
  const {
    data: product,
    error,
    isLoading,
  } = useSWR<Product>(`/api/products/${slug}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  // Handlers
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    setIsAddingToCart(true);
    try {
      // Aquí iría la lógica de agregar al carrito
      // const response = await addToCart({...})
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
      toast.success('Producto agregado al carrito');
      // Opcional: redireccionar al carrito
      // router.push('/cart');
    } catch (error) {
      toast.error('Error al agregar al carrito');
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    // Aquí iría la lógica de agregar a favoritos
    toast.success('Producto guardado en favoritos');
  };

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
        <ImageGallery
          mainImage={product.imageSrc}
          images={product.imageSwiper}
          productName={product.name}
        />

        {/* Información del Producto */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <ProductInfo
            name={product.name}
            price={product.price}
            description={product.description}
          />

          <SizeSelector
            sizes={SIZES}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />

          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          <ActionButtons
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            showShareMenu={showShareMenu}
            onToggleShare={() => setShowShareMenu(!showShareMenu)}
            productUrl={
              typeof window !== 'undefined' ? window.location.href : ''
            }
            isLoading={isAddingToCart}
          />
        </div>
      </div>

      {/* Sección de Productos Relacionados */}
      <div className="relative mt-24">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-lg font-medium text-gray-900">
            Productos Relacionados
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
