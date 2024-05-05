/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import sassStyles from './top.module.scss';
import { MdSecurity } from 'react-icons/md';
import { BsSuitHeart } from 'react-icons/bs';
import { RiAccountPinCircleLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';

export default function Top() {
  return (
    <div className={sassStyles.top}>
      <div className={sassStyles.top_container}>
        <div></div>
        <ul className={sassStyles.top_list}>
          <li>
            <img
              src="https://media.istockphoto.com/id/1343677863/es/vector/vector-de-bandera-circular-de-argentina-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=RAIOJREjlHdV_nQP6Ay05FTrfmefVeJZGkpGeaJ0660="
              alt="Bandera de Argentina"
            />

            <span>Argentina / Peso argentino</span>
          </li>

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
            <span>Lista Blanca</span>
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
