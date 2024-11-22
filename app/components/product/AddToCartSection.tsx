'use client';

import { useState } from 'react';
import { useAddToCart } from '@/app/hooks/useAddToCart';
import { toast } from 'react-hot-toast';
import type { Product } from '@/app/types/product';

interface AddToCartSectionProps {
  product: Product;
}

export default function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { handleAddToCart } = useAddToCart();
  const [isLoading, setIsLoading] = useState(false);

  const onAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Por favor selecciona una talla');
      return;
    }

    setIsLoading(true);
    try {
      await handleAddToCart(product, quantity, selectedSize);
    } catch (error) {
      toast.error('Error al agregar al carrito');
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Talla</label>
          <div className="flex gap-2">
            {['Chico', 'Mediano', 'Grande'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  rounded-full border-2 px-4 py-2 text-sm font-medium
                  ${
                    selectedSize === size
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-300 text-gray-700 hover:border-purple-500'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Cantidad</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        disabled={isLoading}
        className="w-full rounded-full bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
      </button>
    </div>
  );
}
