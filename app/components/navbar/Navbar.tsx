'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import {
  ShoppingBag,
  Home,
  Info,
  Phone,
  Book,
  ShoppingCart,
} from 'lucide-react';
import HamburgerIconAnotherVersion from './HamburgerIconAnotherVersion';
import Image from 'next/image';

interface MenuItem {
  title: string;
  icon: React.ComponentType;
  href: string;
}

const CartButton = () => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-2 rounded-full bg-purple-500 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl"
  >
    <div className="relative">
      <ShoppingCart className="h-5 w-5" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-purple-600">
        0
      </span>
    </div>
    <span className="text-sm font-medium">Mi Carrito</span>
  </motion.button>
);

const Navbar: React.FC = () => {
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
    document.documentElement.style.overflow = !showMenu ? 'hidden' : '';
  };

  const menuItems: MenuItem[] = [
    { title: 'INICIO', icon: Home, href: '/' },
    { title: 'TODOS LOS PRODUCTOS', icon: ShoppingBag, href: '/productos' },
    { title: 'SOBRE MP', icon: Info, href: '/sobre-mp' },
    { title: 'CONTACTO', icon: Phone, href: '/contacto' },
    { title: 'CATÁLOGO', icon: Book, href: '/catalogo' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 shadow-lg backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer"
          >
            <Image
              src="/maria-pancha-logo.jpg"
              alt="Maria Pancha Logo"
              width={70}
              height={70}
              className="rounded-full object-contain"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {menuItems.slice(1, 4).map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                className="relative text-gray-700 hover:text-purple-600"
                whileHover={{ scale: 1.05 }}
              >
                {item.title}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 w-0 bg-purple-600"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <div className="relative cursor-pointer">
              <CartButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="fixed right-4 top-6 z-50 lg:hidden"
            aria-label="Toggle menu"
          >
            <HamburgerIconAnotherVersion
              isOpen={showMenu}
              className="text-gray-700 hover:text-purple-600"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-white pt-20 lg:hidden"
          >
            <div className="flex h-full flex-col px-6 py-8">
              {/* Cart Button */}
              <div className="mb-8 flex justify-center">
                <CartButton />
              </div>

              {/* Menu Items */}
              <div className="flex flex-1 flex-col space-y-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      className="flex items-center space-x-4 rounded-lg p-4 transition-colors hover:bg-purple-50"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={toggleMenu}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                        <Icon />
                      </div>
                      <span className="text-lg font-medium text-gray-700">
                        {item.title}
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Social Media with Divider */}
              <div className="mt-auto">
                {/* Divider Line */}
                <div className="mb-6">
                  <div className="h-px bg-gray-200"></div>
                </div>

                <div className="text-center">
                  <p className="mb-4 text-sm font-medium text-gray-500">
                    SÍGUENOS EN REDES SOCIALES
                  </p>
                  <div className="flex justify-center space-x-8">
                    <motion.a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors hover:text-pink-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors hover:text-blue-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFacebook className="h-6 w-6" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
