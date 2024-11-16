import ProductGrid from '../components/product-grid/ProductGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todos los Productos | Maria Pancha',
  description: 'Descubre nuestra colección completa de pantuflas artesanales',
};

export default function ProductosPage() {
  return (
    <div className="pt-24">
      <ProductGrid />
    </div>
  );
}
