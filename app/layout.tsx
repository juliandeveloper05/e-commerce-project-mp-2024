import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { Poppins, Roboto } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import Providers from './Providers';
import WhatsAppButton from './components/whatsapp-button/WhatsAppButton';
import Loading from './components/Loading/Loading';
import { Suspense } from 'react';

// Font configuration
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

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea',
};

// Metadata configuration
export const metadata: Metadata = {
  title: 'Maria Pancha | E-Commerce',
  description: 'Encuentra las mejores pantuflas artesanales para tu comodidad',
  keywords: ['pantuflas', 'artesanal', 'calzado', 'comodidad', 'Maria Pancha'],
  authors: [{ name: 'Maria Pancha' }],
  openGraph: {
    title: 'Maria Pancha | E-Commerce',
    description:
      'Encuentra las mejores pantuflas artesanales para tu comodidad',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/maria-pancha-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Maria Pancha Logo',
      },
    ],
  },
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
    <html
      lang="es"
      className={`${poppins.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
        <Providers>
          <div className="flex min-h-screen flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Main content with Suspense */}
            <Suspense fallback={<Loading />}>
              <main className="relative flex-1">{children}</main>
            </Suspense>

            {/* Footer */}
            <Footer />
          </div>

          {/* Floating WhatsApp button */}
          <WhatsAppButton />
        </Providers>

        {/* Script for viewport height on mobile */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setVH() {
                  let vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
                }
                setVH();
                window.addEventListener('resize', setVH);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
