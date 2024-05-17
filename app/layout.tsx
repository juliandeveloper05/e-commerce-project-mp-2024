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
          {/*Hero Page*/}
          <main>{children}</main>
          <div>
            {/*Productos*/}
            <div className="mb-5 text-center text-[28px] font-semibold leading-tight  md:mt-16  md:text-[34px]">
              Productos Destacados
            </div>
            <div className=" -my-1 mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:my-2 lg:grid-cols-3">
              <div id="primer-producto">
                <ProductCard
                  imageSrc="/productCard/pantufla3.jpg"
                  name="Pantufla Bob Esponja"
                  price={7900}
                />
              </div>
              <ProductCard
                imageSrc="/productCard/pantufla1.jpg"
                name="Pantufla Kitty"
                price={7900}
              />
              <ProductCard
                imageSrc="/productCard/pantufla2.jpg"
                name="Pantufla Rolling Stone"
                price={7900}
              />
              <ProductCard
                imageSrc="/productCard/pantufla4.jpg"
                name="Pantufla Rose Cat"
                price={7900}
              />
              <ProductCard
                imageSrc="/productCard/pantufla5.jpg"
                name="Pantufla Lilo"
                price={7900}
              />
              <ProductCard
                imageSrc="/productCard/pantufla6.jpg"
                name="Pantufla Ojo Turco"
                price={7900}
              />
              <ProductCard
                imageSrc="/productCard/pantufla7.jpg"
                name="Pantufla Pantera Rosa"
                price={7900}
              />
              <ProductCard
                imageSrc="/productCard/pantufla8.jpg"
                name="Pantufla Harry Potter"
                price={7900}
              />
              <ProductCard
                imageSrc="/productCard/pantufla9.jpg"
                name="Pantufla Hombre Araña"
                price={7900}
              />
            </div>
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}
