// types/product.ts

// Interfaz para tallas de los productos
interface Size {
  size: string;
}

// Interfaz principal para el producto
export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  imageSrc: string;
  slug: string;
  sizes?: Size[];
  imageSwiper?: string[];
  category?: string;
  inStock?: boolean;
  rating?: number;
  numReviews?: number;
}

// Props para el componente ProductGrid
export interface ProductGridProps {
  products: Product[];
}

// Props para la tarjeta de producto individual
export interface ProductCardProps {
  product: Product;
}

// Tipo para el estado de filtrado
export type FilterCategory = 'all' | 'featured' | 'new' | 'sale';

// Interfaz para el estado de ordenamiento
export interface SortOption {
  value: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  label: string;
}

// Tipo para producto aplanado (sin _id)
export type FlattenedProduct = Omit<Product, '_id'> & {
  _id: string | undefined;
};
