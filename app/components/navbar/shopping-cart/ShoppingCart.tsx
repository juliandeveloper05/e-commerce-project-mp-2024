import React from 'react';
import styles from './ShoppingCart.module.css';

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
      <span className={styles.cartIcon}>🛒</span>
      <span className={styles.cartCount}>0</span>
    </div>
  ) : null;
};

export default ShoppingCart;
