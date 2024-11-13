'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CiShoppingCart } from 'react-icons/ci';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import HamburgerIcon from './Hamburguer-Menu/HamburguerIcon';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !showMenu ? 'hidden' : 'unset';
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="relative h-[70px] w-[70px]">
          <Image
            src="/maria-pancha-logo.jpg"
            alt="Maria Pancha Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <Link
            href="/#primer-producto"
            className="text-gray-700 hover:text-purple-600"
          >
            TODOS LOS PRODUCTOS
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-purple-600">
            SOBRE MP
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-purple-600">
            CONTACTO
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-purple-600">
            <CiShoppingCart className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <HamburgerIcon />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-[86px] bg-white transition-transform duration-300 lg:hidden ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col bg-gradient-to-b from-purple-50 to-white px-6 py-8">
          <div className="flex flex-col gap-6">
            <Link
              href="/#primer-producto"
              className="text-lg font-medium text-gray-800 hover:text-purple-600"
              onClick={toggleMenu}
            >
              TODOS LOS PRODUCTOS
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium text-gray-800 hover:text-purple-600"
              onClick={toggleMenu}
            >
              SOBRE MP
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-gray-800 hover:text-purple-600"
              onClick={toggleMenu}
            >
              CONTACTO
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-purple-600"
              onClick={toggleMenu}
            >
              <CiShoppingCart className="h-6 w-6" />
              CARRITO
            </Link>
          </div>

          {/* Additional Mobile Menu Items */}
          <div className="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-8">
            <Link
              href="/catalogo"
              className="text-base text-gray-600 hover:text-purple-600"
              onClick={toggleMenu}
            >
              Catálogo
            </Link>
            <Link
              href="/novedades"
              className="text-base text-gray-600 hover:text-purple-600"
              onClick={toggleMenu}
            >
              Novedades
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-auto">
            <div className="flex items-center justify-center gap-6 border-t border-gray-200 pt-6">
              <a
                href="https://www.instagram.com/pantuflonesmariapancha/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors duration-200 hover:text-purple-600"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors duration-200 hover:text-purple-600"
              >
                <span className="sr-only">WhatsApp</span>
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100091649971681"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors duration-200 hover:text-purple-600"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
