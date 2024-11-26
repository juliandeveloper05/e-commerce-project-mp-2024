'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Home, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Account = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const result = await signOut({
        redirect: false,
        callbackUrl: '/',
      });

      toast.success('Sesión cerrada exitosamente');
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-8 flex items-center gap-2 text-gray-600 hover:text-purple-600"
          >
            <Home className="h-5 w-5" />
            Volver a la tienda
          </motion.button>
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <div className="text-center">
            <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-purple-100">
              <Image
                src={session?.user?.image || '/default-avatar.png'}
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              {session?.user?.name}
            </h1>
            <p className="text-gray-500">{session?.user?.email}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-white transition-all hover:bg-purple-700 disabled:opacity-50"
            >
              <LogOut className="h-5 w-5" />
              {isLoading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </motion.button>

            <Link href="/favoritos">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-purple-200 px-6 py-3 text-purple-600 transition-all hover:bg-purple-50"
              >
                <Heart className="h-5 w-5" />
                Mis Favoritos
              </motion.button>
            </Link>
          </div>

          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-medium text-gray-700">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-sm text-gray-500">
              Contáctanos a través de{' '}
              <a
                href="https://wa.me/5491126625292"
                className="font-medium text-purple-600 hover:text-purple-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
