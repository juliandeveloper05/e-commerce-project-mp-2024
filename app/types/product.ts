// types/product.ts

// Interfaces base
export interface Size {
  size: string; // "Chico" | "Mediano" | "Grande"
}

export interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  color?: string;
  size: Size;
  stock: number;
  sku: string;
}

// Interfaz principal del Producto
export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number; // Precio anterior (para mostrar descuentos)
  imageSrc: string;
  imageSwiper?: string[];
  images?: ProductImage[];
  category?: string;
  subcategory?: string;
  tags?: string[];
  sizes?: Size[];
  variants?: ProductVariant[];
  specifications?: {
    material: string;
    soleType: string;
    careInstructions: string[];
  };
  stock: number;
  sku: string;
  status: 'draft' | 'active' | 'inactive';
  featured: boolean;
  reviews?: Review[];
  rating?: {
    average: number;
    count: number;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  metadata?: {
    createdBy: string;
    updatedBy: string;
    publishedAt?: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Props para componentes específicos
export interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  imageSrc: string;
  slug: string;
}

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  error?: string;
}

// Tipos para el carrito
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  imageSrc: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
}

// Tipos para filtros y ordenamiento
export type FilterCategory = 'all' | 'featured' | 'new' | 'sale';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SortOption {
  value: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  label: string;
}

export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  sizes?: string[];
  tags?: string[];
  featured?: boolean;
}

// Tipos para respuestas de API
export interface ProductApiResponse {
  success: boolean;
  data?: Product | Product[];
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}

// Tipos para acciones del producto
export type ProductAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string; size: string } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { id: string; size: string; quantity: number };
    }
  | { type: 'CLEAR_CART' };

// Enums para valores constantes
export enum ProductSize {
  Small = 'Chico',
  Medium = 'Mediano',
  Large = 'Grande',
}

export enum ProductStatus {
  Draft = 'draft',
  Active = 'active',
  Inactive = 'inactive',
}

// Constantes
export const DEFAULT_PRODUCT_IMAGE = '/placeholder-product.jpg';

export const SORT_OPTIONS: SortOption[] = [
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' },
];

export const ITEMS_PER_PAGE = 12;

// Funciones de utilidad
export const calculateDiscount = (
  price: number,
  compareAtPrice?: number,
): number => {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
};

export const formatProductName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// Validadores
export const isValidProduct = (
  product: Partial<Product>,
): product is Product => {
  return !!(product.name && product.price && product.slug && product.imageSrc);
};

export const isInStock = (product: Product, size?: string): boolean => {
  if (size) {
    const variant = product.variants?.find((v) => v.size.size === size);
    return variant ? variant.stock > 0 : false;
  }
  return product.stock > 0;
};
