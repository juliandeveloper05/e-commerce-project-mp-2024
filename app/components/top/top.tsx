'use client';

import { BsSuitHeart } from 'react-icons/bs';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Top() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <li>
              <Link
                href="https://wa.me/5491126625292?text=Hola%20Maria%20Pancha%20Pantuflones%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos."
                className="flex items-center gap-1 text-sm transition-colors duration-200 hover:text-yellow-300"
              >
                Servicio al Cliente
              </Link>
            </li>
            <li>
              <button className="flex items-center gap-1 text-sm transition-colors duration-200 hover:text-yellow-300">
                <BsSuitHeart className="h-5 w-5" />
                <span>Favoritos</span>
              </button>
            </li>
          </ul>
          <div className="flex items-center justify-center gap-4">
            {session && session.user ? (
              <>
                <span className="max-w-[150px] truncate text-sm font-medium">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:bg-red-600"
                >
                  Cerrar
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="rounded bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-800 transition-colors duration-200 hover:bg-yellow-500"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
