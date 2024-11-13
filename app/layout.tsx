import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Top from './components/top/top';
import { Poppins, Roboto } from 'next/font/google';
import { Metadata } from 'next';
import Providers from './Providers';
import { UserProvider } from '../app/contexts/UserContext';
import WhatsAppButton from './components/whatsapp-button/WhatsAppButton';

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
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <body>
        <Providers>
          <section className="min-h-screen">
            <Top />
            <Navbar />
            {/* Contenedor principal con espaciado responsivo */}
            <main className="relative mt-[86px] sm:mt-[96px] md:mt-[80px] lg:mt-[10px]">
              <div className="flex min-h-[calc(80vh-40px)] flex-col">
                {children}
              </div>
            </main>
          </section>
          {params.slug}
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
