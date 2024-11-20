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
  User,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import HamburgerIconAnotherVersion from './HamburgerIconAnotherVersion';
import { useSession } from 'next-auth/react';

// Types
interface MenuItem {
  title: string;
  icon: React.ComponentType;
  href: string;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

// NavLink Component
const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  isActive,
  onClick,
}) => {
  return (
    <Link href={href} passHref>
      <div
        onClick={onClick}
        className={`relative cursor-pointer text-sm font-medium transition-colors
          ${
            isActive ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'
          }`}
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 w-full bg-purple-600"
            layoutId="navbar-underline"
          />
        )}
      </div>
    </Link>
  );
};

// CartButton Component
const CartButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        <motion.span
          initial={false}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-purple-600"
        >
          0
        </motion.span>
      </div>
      <span className="text-sm font-medium">Mi Carrito</span>
    </motion.button>
  );
};

// Main Navbar Component
const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Menu items configuration
  const menuItems: MenuItem[] = [
    { title: 'INICIO', icon: Home, href: '/' },
    { title: 'TODOS LOS PRODUCTOS', icon: ShoppingBag, href: '/productos' },
    { title: 'SOBRE MP', icon: Info, href: '/sobre-mp' },
    { title: 'CONTACTO', icon: Phone, href: '/contacto' },
    { title: 'CATÁLOGO', icon: Book, href: '/catalogo' },
  ];

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    document.documentElement.style.overflow = !showMenu ? 'hidden' : '';
  };

  const isActiveLink = (currentPath: string, href: string): boolean => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

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
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between px-4 py-2">
            {/* Logo */}
            <Link href="/">
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
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex lg:items-center lg:gap-8">
              <ul className="flex items-center space-x-8">
                {menuItems.slice(0, 4).map((item) => (
                  <li key={item.title}>
                    <NavLink
                      href={item.href}
                      isActive={isActiveLink(pathname, item.href)}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* User and Cart Buttons */}
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-3 text-purple-600 shadow-sm transition-all hover:bg-purple-50"
                  >
                    {session ? (
                      <Image
                        src={session.user?.image || '/default-avatar.png'}
                        alt="Profile"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </motion.div>
                </Link>

                <Link href="/cart">
                  <CartButton />
                </Link>
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
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
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
              {/* User and Cart Buttons in Mobile */}
              <div className="mb-8 flex justify-center gap-4">
                <Link href="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-3 text-purple-600 shadow-sm transition-all hover:bg-purple-50"
                    onClick={toggleMenu}
                  >
                    {session ? (
                      <Image
                        src={session.user?.image || '/default-avatar.png'}
                        alt="Profile"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </motion.div>
                </Link>

                <Link href="/cart">
                  <div onClick={toggleMenu}>
                    <CartButton />
                  </div>
                </Link>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex flex-1 flex-col space-y-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = isActiveLink(pathname, item.href);

                  return (
                    <Link key={item.title} href={item.href}>
                      <motion.div
                        className={`flex items-center space-x-4 rounded-lg p-4 transition-colors
            ${
              isActive ? 'bg-purple-50 text-purple-600' : 'hover:bg-purple-50'
            }`}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={toggleMenu}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full
            ${isActive ? 'bg-purple-100' : 'bg-gray-100'}`}
                        >
                          <Icon />
                        </div>
                        <span
                          className={`text-lg font-medium
            ${isActive ? 'text-purple-600' : 'text-gray-700'}`}
                        >
                          {item.title}
                        </span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Social Media */}
              <div className="mt-auto">
                <div className="mb-6 h-px bg-gray-200" />
                <div className="text-center">
                  <p className="mb-4 text-sm font-medium text-gray-500">
                    SÍGUENOS EN REDES SOCIALES
                  </p>
                  <div className="flex justify-center space-x-8">
                    <motion.a
                      href="https://instagram.com/pantuflonesmariapancha/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors hover:text-pink-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaInstagram className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="https://facebook.com/profile.php?id=100091649971681"
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
