import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Top from './components/top/top';
import { Poppins, Roboto } from 'next/font/google';
import { Metadata } from 'next';
import ProductCard from './components/productCard/ProductCard';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Maria Pancha | E-Commerce',
  description: 'Ecommerce app',
  icons: {
    icon: '/maria-pancha-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body>
        <section>
          <Top />
          <Navbar />
          <main>{children}</main>

          <div className=" mx-auto my-14 grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              imageSrc="/productCard/pantufla3.jpg"
              name="Pantufla Bob Esponja"
              price={4000}
            />
            <ProductCard
              imageSrc="/productCard/pantufla1.jpg"
              name="Pantufla Kitty"
              price={4000}
            />
            <ProductCard
              imageSrc="/productCard/pantufla2.jpg"
              name="Pantufla Rolling Stone"
              price={4000}
            />
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
