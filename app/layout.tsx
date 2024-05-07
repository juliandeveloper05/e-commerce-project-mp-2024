import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Top from './components/top/top';
import { Poppins, Roboto } from 'next/font/google';
import { Metadata } from 'next';

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
        </section>
        <Footer />
      </body>
    </html>
  );
}
