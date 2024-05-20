import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Top from './components/top/top';
import { Poppins, Roboto } from 'next/font/google';
import { Metadata } from 'next';
import ProductCard from './components/productCard/ProductCard';
import db from '../utils/db';
import Product from './model/Product';
import Link from 'next/link';

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

interface Product {
  _id: string;
  name: string;
  price: number;
  imageSrc: string;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await db.connectDb();
    const products: Product[] = await Product.find({});
    await db.disconnectDb();

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
                {products.map((product: Product) => {
                  // Verificar si product._id existe y no es null
                  if (product._id) {
                    return (
                      <Link
                        key={product._id}
                        href={`/productos/${product._id}`}
                      >
                        <ProductCard
                          id={product._id}
                          imageSrc={product.imageSrc}
                          name={product.name}
                          price={product.price}
                        />
                      </Link>
                    );
                  } else {
                    // Manejar el caso donde product._id sea null o undefined
                    return (
                      <div key={product.name}>
                        <p>Error: ID de producto no válido</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </section>
          <Footer />
        </body>
      </html>
    );
  } catch (err) {
    console.error('Error al obtener los productos:', err);
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
                <p>Error al cargar los productos</p>
              </div>
            </div>
          </section>
          <Footer />
        </body>
      </html>
    );
  }
}
