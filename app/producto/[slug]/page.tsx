import type { Metadata } from 'next';
import ProductDetails from './productDetails';
import ProductsSection from '@/app/components/productCard/ProductSection/ProductsSection';

export const metadata: Metadata = {
  title: 'Producto',
};

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  return (
    <>
      <ProductDetails slug={params.slug} />
      <ProductsSection />
    </>
  );
}
