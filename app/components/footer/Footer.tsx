import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaWhatsapp, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-slate-700 py-8 text-sm text-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Nuestra Página */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold">Nuestra Página</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-purple-400">
                Inicio
              </Link>
              <Link href="/productos" className="hover:text-purple-400">
                Productos
              </Link>
              <Link href="/sobre-mp" className="hover:text-purple-400">
                Sobre MP
              </Link>
            </div>
          </div>

          {/* Sobre Nosotros */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold">Sobre Nosotros</h3>
            <p className="text-sm">
              MP María Pancha Pantuflones: Pantuflones de peluche artesanales
              con tela plush premium. Talles Chico, Mediano y Grande.
            </p>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold">Síguenos en Redes</h3>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/5491126625292"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-green-400"
              >
                <FaWhatsapp size={24} />
              </a>
              <a
                href="https://instagram.com/pantuflonesmariapancha"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-pink-400"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://facebook.com/profile.php?id=100091649971681"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400"
              >
                <FaFacebook size={24} />
              </a>
            </div>

            <div className="mt-4">
              <Image
                src="/payment/mercadopago.webp"
                alt="Mercado Pago"
                width={60}
                height={36}
                className="rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="my-8 border-t border-slate-600" />

        {/* Copyright y Créditos del desarrollador */}
        <div className="flex flex-col items-center justify-between space-y-4 text-center text-sm sm:flex-row sm:space-y-0">
          <p>
            © {currentYear} MP María Pancha. Todos los derechos reservados.
          </p>

          <div className="flex items-center space-x-1">
            <span>Desarrollado con</span>
            <FaHeart className="mx-1 text-red-500" />
            <span>por</span>
            <a
              href="https://juliansoto-portfolio.vercel.app/es"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium text-purple-400 transition-colors hover:text-purple-300"
            >
              Julian Javier Soto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
