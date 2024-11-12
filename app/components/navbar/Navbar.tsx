'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import ShoppingCart from './shopping-cart/ShoppingCart';
import HamburgerIcon from './Hamburguer-Menu/HamburguerIcon';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav
      className={`${poppins.className} ${styles.navbar}
        fixed left-0 right-0 top-0 z-50 mx-auto
        bg-white transition-all duration-300
        ${scrolled ? 'shadow-lg' : 'shadow-none'}
        px-5 py-3 lg:px-6`}
    >
      {/* LOGO */}
      <div className="px-5">
        <Image
          src="/maria-pancha-logo.jpg"
          alt="Maria Pancha Logo"
          width={90}
          height={90}
          className="h-[90px] w-[90px]"
        />
      </div>

      {/* DESKTOP LINKS */}
      <div className={`${styles.desktopLinks}`}>
        <div className="px-22 lg:-mr-5">
          <ul className={`${styles.navLinkList} text-slate-700 lg:mx-10`}>
            <li>
              <Link href="/#primer-producto" className={styles.navLinkItem}>
                TODOS LOS PRODUCTOS
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.navLinkItem}>
                SOBRE MP
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navLinkItem}>
                CONTACTO
              </Link>
            </li>
          </ul>
        </div>

        <div className="py-3" />

        {/* Shopping Cart */}
        <div className="px-5">
          <Link href="/cart">
            <ShoppingCart showOnDesktop />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.hamburgerMenu} px-3`}>
        <button onClick={toggleMenu} className="focus:outline-none">
          <HamburgerIcon />
        </button>
        {showMenu && (
          <div className="absolute left-0 right-0 top-full bg-white shadow-lg">
            <ul className="py-4">
              <li className="px-6 py-2">
                <Link href="/" className="block hover:text-purple-600">
                  HOME
                </Link>
              </li>
              {/* Otros enlaces del menú móvil */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
