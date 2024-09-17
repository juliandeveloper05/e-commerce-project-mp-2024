import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { LoginButton } from '@/app/components/ui/login-button';

const EmptyCart = () => {
  return (
    <div className="my-24 mb-24 flex min-h-full flex-col items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <FaShoppingCart size={48} className="mb-6 text-gray-400" />
        </div>
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">El carrito está vacío</h2>
          <p className="mb-6 text-gray-600">
            Antes de continuar, necesitas agregar productos a tu carrito.
          </p>
          <div className="flex flex-col justify-center sm:flex-row">
            <LoginButton>
              <button className="mb-4 w-full rounded bg-yellow-500 px-6 py-3 font-bold text-white hover:bg-yellow-700 sm:mb-0 sm:mr-4 sm:w-auto">
                ACCEDER A LA CUENTA
              </button>
            </LoginButton>
            <Link
              href="/"
              className="w-full rounded bg-black px-6 py-3 font-bold text-white hover:bg-gray-700 sm:w-auto"
            >
              VOLVER A LA TIENDA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
