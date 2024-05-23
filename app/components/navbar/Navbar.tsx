'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import ShoppingCart from './shopping-cart/ShoppingCart';
import HamburgerIcon from './Hamburguer-Menu/HamburguerIcon';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav
      className={`${poppins.className} ${styles.navbar}
        left-0
        right-0
        top-0 
        z-50 
        mx-auto 
        justify-between 
        bg-white 
        px-5 
        py-3 
        shadow-lg 
        lg:px-6
        `}
    >
      {/* LOGO */}
      <div className="px-5">
        <Link href="/" legacyBehavior>
          <Image
            src="/maria-pancha-logo.jpg"
            alt="Maria Pancha Logo"
            width={90}
            height={20}
            className="  
            h-[90px]
            w-[90px]
            "
          />
        </Link>
      </div>

      {/* DESKTOP LINKS */}

      <div className={`${styles.desktopLinks} `}>
        {/*Separate the navbar buttons with the shopping cart on the desktop*/}

        <div className="px-22 lg:-mr-5">
          <ul className={`${styles.navLinkList} text-slate-700 lg:mx-10`}>
            <li>
              <Link href="/#primer-producto" legacyBehavior>
                <a className={styles.navLinkItem}>TODOS LOS PRODUCTOS</a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className={styles.navLinkItem}>SOBRE MP</a>
              </Link>
            </li>
            <li>
              <Link href="/contact" legacyBehavior>
                <a className={styles.navLinkItem}>CONTACTO</a>
              </Link>
            </li>
          </ul>
        </div>
        {/*Extra Container*/}
        <div className="py-3"></div>
        {/* Shopping Cart on Desktop */}
        <div className="px-5">
          <ShoppingCart showOnDesktop />
        </div>
      </div>

      {/* HAMBURGER MENU */}
      <div className={`${styles.hamburgerMenu} px-3 `}>
        <div onClick={toggleMenu}>
          <HamburgerIcon />
        </div>
        {showMenu && (
          <div>
            <ul className={styles.navLinkList}>
              <li>
                <Link href="/" legacyBehavior>
                  <a className={styles.navLinkItem}>HOME</a>
                </Link>
              </li>
              <li>
                <Link href="/products" legacyBehavior>
                  <a className={styles.navLinkItem}>ALL PRODUCTS</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a className={styles.navLinkItem}>ABOUT MP</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className={styles.navLinkItem}>CONTACT</a>
                </Link>
              </li>
            </ul>
            <div>
              <ShoppingCart />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
