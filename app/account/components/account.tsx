'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaEdit, FaArrowLeft } from 'react-icons/fa';

const Account = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      setName(session.user.name || '');
    }
  }, [session, status, router]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameSubmit = async () => {
    try {
      const response = await fetch('/api/user/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        setIsEditing(false);
        // Aquí podrías actualizar la sesión si es necesario
      } else {
        console.error('Failed to update name');
      }
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  return (
    <div className="flex min-h-[calc(140vh-25rem)] w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Mi Cuenta
        </h2>
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            <Image
              src={session?.user?.image || '/default-avatar.png'}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border-2 border-white object-cover shadow-lg"
            />
          </div>
        </div>
        <div className="mb-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              <FaUser className="mr-2 inline" />
              Nombre
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <FaEdit size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              <FaEnvelope className="mr-2 inline" />
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ''}
              disabled
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm"
            />
          </div>
        </div>
        {isEditing && (
          <button
            onClick={handleNameSubmit}
            className="mb-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Guardar
          </button>
        )}
        <button
          onClick={() => router.push('/')}
          className="flex w-full items-center justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <FaArrowLeft className="mr-2" />
          Volver a la tienda
        </button>
      </div>
    </div>
  );
};

export default Account;
