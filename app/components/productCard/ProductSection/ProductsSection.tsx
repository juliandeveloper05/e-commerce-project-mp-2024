'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import type { Product } from '../../../types/product';
import styles from './ProductsSection.module.css';

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.emptyContainer}>
        <p>No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className={styles.productsSection}>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id} // Cambiamos 'id' por '_id'
            name={product.name}
            price={product.price}
            imageSrc={product.imageSrc}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
}
