import React from 'react';
import sassStyles from './UserMenu.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function UserMenu({ loggedIn }) {
  return (
    <div className={`${sassStyles.menu} bg-slate-100 shadow-lg`}>
      <h4>¡Bienvenidos a Maria pancha!</h4>
      {loggedIn ? (
        <div className={sassStyles.flex}>
          <Image
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
            alt=""
          />
        </div>
      ) : (
        <div className={sassStyles.links}>
          <Link href="/Myaccount">My account</Link>
          <Link href="/Cart">CART</Link>
        </div>
      )}
    </div>
  );
}
