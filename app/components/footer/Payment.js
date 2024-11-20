import Image from 'next/image';
import styles from './Payment.module.scss';

export default function Payment({ className }) {
  return (
    <div className={`${styles.payment} ${className}`}>
      <h3 className="mb-2 text-base font-bold">Nosotros Aceptamos</h3>
      <div className={styles.flexwrap}>
        {/*Aca la clienta prefiere que solo este mercado pago */}
        {/* 
        <Image
          src="/payment/mastercard.webp"
          alt="mastercard"
          width={50}
          height={30}
        />
        */}
        <Image
          src="/payment/mercadopago.webp"
          alt="mercado pago"
          width={50}
          height={30}
        />
      </div>
    </div>
  );
}
