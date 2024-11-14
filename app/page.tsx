import HeroSection from './components/hero-section/HeroSection';
import ProductsSection from './components/productCard/ProductSection/ProductsSection';

export default function Page() {
  return (
    <main className=" mt-[140px] sm:mt-[96px] md:mt-[80px] lg:mt-[50px]">
      <HeroSection />
      <ProductsSection />
    </main>
  );
}
