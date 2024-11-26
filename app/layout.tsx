// app/layout.tsx
import { Poppins, Roboto } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import { Suspense } from 'react';

// Componentes
import './ui/global.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import WhatsAppButton from './components/whatsapp-button/WhatsAppButton';
import Loading from './components/Loading/Loading';
import ClientProviders from './components/ClientProviders';

// Optimización de fuentes
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
  display: 'swap', // Mejora la carga inicial de fuentes
  preload: true, // Asegura que las fuentes se precarguen
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
});

// Configuración del viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5, // Permite zoom limitado para accesibilidad
  themeColor: '#9333ea',
  colorScheme: 'light', // Especifica el esquema de color preferido
};

// Metadatos de la aplicación
export const metadata: Metadata = {
  metadataBase: new URL('https://mariapancha.vercel.app'), // Actualiza con tu dominio real
  title: {
    default: 'Maria Pancha | E-Commerce',
    template: '%s | Maria Pancha',
  },
  description:
    'Encuentra las mejores pantuflas artesanales para tu comodidad. Diseños únicos y materiales de calidad.',
  keywords: [
    'pantuflas',
    'artesanal',
    'calzado',
    'comodidad',
    'Maria Pancha',
    'pantuflas artesanales',
    'calzado cómodo',
    'pantuflas de diseño',
  ],
  authors: [{ name: 'Maria Pancha', url: 'https://mariapancha.vercel.app' }],
  creator: 'Maria Pancha',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://mariapancha.vercel.app',
    title: 'Maria Pancha | E-Commerce',
    description:
      'Encuentra las mejores pantuflas artesanales para tu comodidad',
    siteName: 'Maria Pancha',
    images: [
      {
        url: '/maria-pancha-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Maria Pancha Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maria Pancha | E-Commerce',
    description:
      'Encuentra las mejores pantuflas artesanales para tu comodidad',
    images: ['/maria-pancha-logo.jpg'],
  },
  icons: {
    icon: '/maria-pancha-logo.jpg',
    shortcut: '/maria-pancha-logo.jpg',
    apple: '/maria-pancha-logo.jpg',
  },
  manifest: '/site.webmanifest', // Asegúrate de tener este archivo en la carpeta public
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

// Script para manejar la altura del viewport en móviles
const viewportScript = `
  (function() {
    function setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
    }
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
  })();
`;

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
      <head>
        {/* Preconexiones para mejora de rendimiento */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Meta tags adicionales para SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#9333ea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Maria Pancha" />

        {/* Script para el viewport */}
        <script
          dangerouslySetInnerHTML={{
            __html: viewportScript,
          }}
        />
      </head>

      <body className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
        <ClientProviders>
          <div className="flex min-h-screen flex-col">
            {/* Barra de navegación */}
            <Navbar />

            {/* Contenido principal con Suspense para carga */}
            <Suspense fallback={<Loading />}>
              <main className="relative flex-1 pt-16">{children}</main>
            </Suspense>

            {/* Footer */}
            <Footer />

            {/* Botón de WhatsApp flotante */}
            <WhatsAppButton />
          </div>
        </ClientProviders>

        {/* Estructura del portal para modales */}
        <div id="modal-root" />

        {/* Script para Google Analytics (opcional) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Script para la detección de dispositivos antiguos */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!('IntersectionObserver' in window)) {
                document.body.innerHTML = 
                  '<div style="padding: 2rem; text-align: center;">' +
                  '<h1>Navegador no compatible</h1>' +
                  '<p>Por favor, actualiza tu navegador para usar este sitio.</p>' +
                  '</div>';
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
