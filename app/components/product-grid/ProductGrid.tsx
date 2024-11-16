'use client';

import { useEffect, useState } from 'react';
import InnovativeProductGrid from '../product-grid/InnovativeProductGrid';
import { Product } from '../../types/product';
import Loading from '../../productos/Loading';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-600">{error}</h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return <InnovativeProductGrid products={products} />;
}
