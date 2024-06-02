import React from 'react';
import styles from './ShoppingCart.module.css';
import { CiShoppingCart } from 'react-icons/ci';

interface ShoppingCartProps {
  className?: string;
  showOnDesktop?: boolean;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  className,
  showOnDesktop = true,
}) => {
  return showOnDesktop ? (
    <div className={`${styles.cartContainer} ${className}`}>
      <span className={`${styles.cartIcon} text-3xl`}>
        <CiShoppingCart />
      </span>
      <span
        className={`${styles.cartCount} 
      absolute
      right-[-10px]
      top-[-10px]
      justify-center
      rounded-full
      `}
      >
        0
      </span>
    </div>
  ) : null;
};

export default ShoppingCart;
