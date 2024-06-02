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

          <li>
            <span>Servicio al Cliente</span>
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
