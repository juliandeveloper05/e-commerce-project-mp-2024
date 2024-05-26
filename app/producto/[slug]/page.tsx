// page.tsx
import type { Metadata } from 'next';
import ProductDetails from './productDetails';

export const metadata: Metadata = {
  title: 'Producto',
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  return <ProductDetails slug={params.slug} />;
}
