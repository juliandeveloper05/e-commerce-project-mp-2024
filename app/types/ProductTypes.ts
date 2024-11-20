export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  imageSrc: string;
  imageSwiper?: string[];
  slug: string;
  sizes?: Size[];
}

export interface Size {
  id: string;
  label: string;
}
