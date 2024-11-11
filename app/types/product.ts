// types/product.ts
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
  slug: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  slug: string;
}
