import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Top from './components/top/top';
import { Poppins } from 'next/font/google';
import styles from './layout.module.scss';
import { Metadata } from 'next';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Maria Pancha | E-Commerce',
  description: 'Ecommerce app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body className={poppins.className}>
        <header className={styles.header}>
          <Top />
          <Navbar />
        </header>

        <main>{children}</main>
        <Footer />
      </body>
    </>
  );
}
