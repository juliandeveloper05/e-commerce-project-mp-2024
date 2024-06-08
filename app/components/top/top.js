'use client';

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import sassStyles from './top.module.scss';
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';
import { useState } from 'react';
import UserMenu from '@/app/components/navbar/UserMenu/UserMenu';

export default function Top() {
  return (
    <div className={sassStyles.top}>
      <div className={sassStyles.top_container}>
        <div></div>
        <ul className={sassStyles.top_list}>
          <li>
            <MdSecurity />
            <span>Protección al consumidor</span>
          </li>

          <li className="flex items-center gap-1 text-xs transition-colors duration-200 hover:text-pink-500">
            <Link
              href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
              legacyBehavior
            >
              <a>Servicio al Cliente</a>
            </Link>
          </li>

          <li>
            <span>Ayuda</span>
          </li>

          <li>
            <BsSuitHeart />
            <span>Favoritos</span>
          </li>

          <li>
            <div className={sassStyles.flex}>
              <RiAccountPinCircleLine />
              <span>Cuenta</span>
              <RiArrowDropDownFill />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
