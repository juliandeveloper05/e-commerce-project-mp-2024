import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Top from './components/top/top';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body className={poppins.className}>
        <div>
          <Top />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </>
  );
}
