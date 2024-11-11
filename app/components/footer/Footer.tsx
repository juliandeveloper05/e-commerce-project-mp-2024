import React from 'react';
import Container from '@/app/ui/Container';
import FooterList from './FooterList';
import Link from 'next/link';
import { MdFacebook } from 'react-icons/md';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Payment from './Payment';

const Footer = () => {
  return (
    <footer className="mt-0 bg-slate-700 text-sm text-slate-200">
      <Container>
        <div className="flex flex-col justify-between pb-8 pt-16 md:flex-row">
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Nuestra Pagina</h3>
            <Link href="/" legacyBehavior>
              <a className="hover:text-[#ff02ab]">Perfil de MP</a>
            </Link>
            <Link href="/#primer-producto" legacyBehavior>
              <a className="hover:text-[#ff02ab]">Todos los Productos</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="hover:text-[#ff02ab]">Sobre MP</a>
            </Link>
            <Link href="/account" legacyBehavior>
              <a className="hover:text-[#ff02ab]">Cuenta</a>
            </Link>
          </FooterList>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Servicio al Cliente</h3>
            <Link
              href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
              legacyBehavior
            >
              <a className="flex items-center hover:text-[#ff02ab]">
                Contactanos
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="hover:text-[#ff02ab]">Politica de Envios</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="hover:text-[#ff02ab]">Unknown</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="hover:text-[#ff02ab]">Preguntas Frecuentes</a>
            </Link>
          </FooterList>
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h3 className="mb-2 text-base font-bold">Sobre Nosotros</h3>
            <p className="mb-2 mt-3">
              MP María Pancha Pantuflones: Pantuflones de peluche artesanales
              con tela plush premium y bordados personalizados. Talles Chico,
              Mediano y Grande. Encuéntrenos en whatsapp, Facebook e Instagram.
            </p>
            <p>
              &copy; {new Date().getFullYear()} MP María Pancha. Todos los
              derechos reservados.
            </p>
          </div>
          <FooterList>
            <h3 className="mb-2 text-base font-bold">Nuestras Redes</h3>
            <div className="flex gap-2">
              <Link
                href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#ff02ab]"
              >
                <FaWhatsapp size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/pantuflonesmariapancha/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#ff02ab]"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=100091649971681"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-[#ff02ab]"
              >
                <MdFacebook size={24} />
              </Link>
            </div>
            <Payment className={'mt-0'} />
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
