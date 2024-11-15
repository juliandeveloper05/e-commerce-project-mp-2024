// types/product.ts
interface Size {
  size: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  imageSrc: string;
  slug: string;
  sizes?: Size[];
  imageSwiper?: string[];
}

export type FlattenedProduct = Omit<Product, '_id'> & {
  _id: string | undefined;
};

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  slug: string;
}
