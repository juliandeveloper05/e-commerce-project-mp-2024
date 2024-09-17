'use client';

import React, { useState } from 'react';
import { BsSuitHeart } from 'react-icons/bs';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Top() {
  const { data: session, update: updateSession } = useSession();
  const router = useRouter();
  const [newName, setNewName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleSignOut = async () => {
    await signOut();
  };

  const handleUpdateName = async () => {
    if (!newName.trim()) return;

    setIsUpdating(true);
    setUpdateMessage('');

    try {
      const response = await fetch('/api/user/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);

        // Actualizar la sesión localmente
        await updateSession({
          ...session,
          user: { ...session?.user, name: newName },
        });

        setNewName('');
      } else {
        const errorText = await response.text();
        console.error('Error updating name:', errorText);
        setUpdateMessage('Error al actualizar el nombre');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      setUpdateMessage('Error al actualizar el nombre');
    } finally {
      setIsUpdating(false);
    }
  };

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
                <Link
                  href="/account"
                  className="max-w-[150px] truncate text-sm font-medium transition-colors duration-200 hover:text-yellow-300"
                >
                  {session.user.name || 'Usuario'}
                </Link>

                {/*
                  <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nuevo nombre"
                  className="rounded px-2 py-1 text-black"
                />
                */}
                {/*
                <button
                  onClick={handleUpdateName}
                  disabled={isUpdating}
                  className="rounded bg-green-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg disabled:bg-gray-400"
                >
                  {isUpdating ? 'Actualizando...' : 'Actualizar Nombre'}
                </button>
                */}
                <button
                  onClick={handleSignOut}
                  className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="rounded bg-yellow-400 px-4 py-2 text-sm font-bold text-gray-800 transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
        {updateMessage && (
          <div
            className={`mt-2 text-center text-sm ${
              updateMessage.includes('Error')
                ? 'text-red-300'
                : 'text-green-300'
            }`}
          >
            {updateMessage}
          </div>
        )}
      </div>
    </div>
  );
}
