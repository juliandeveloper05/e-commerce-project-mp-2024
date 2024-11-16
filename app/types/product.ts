// types/product.ts

// Interfaz para tallas de los productos
interface Size {
  size: string;
}

// types/product.ts
export interface Product {
  _id: string; // Aseguramos que usamos '_id'
  name: string;
  price: number;
  description?: string;
  imageSrc: string;
  slug: string;
  sizes?: Size[];
  imageSwiper?: string[];
}
// Props para el componente ProductGrid
export interface ProductGridProps {
  products: Product[];
}

// Props para la tarjeta de producto individual
export interface ProductCardProps {
  _id: string; // Cambiamos 'id' por '_id' para coincidir con MongoDB
  name: string;
  price: number;
  imageSrc: string;
  slug: string;
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
