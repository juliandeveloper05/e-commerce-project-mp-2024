'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaEdit, FaArrowLeft } from 'react-icons/fa';

const Account = () => {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/placeholder-avatar.png');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user) {
      setName(session.user.name || '');
      if (session.user.image) {
        setProfileImage(session.user.image);
      }
    }
  }, [session, status, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        await updateSession({ ...session, user: { ...session?.user, name } });
      } else {
        console.error('Failed to update name');
      }
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setProfileImage(data.imageUrl);
          await updateSession({
            ...session,
            user: { ...session?.user, image: data.imageUrl },
          });
        } else {
          console.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="bg-grid-pattern min-h-[calc(100vh-12rem)] bg-gray-100  bg-opacity-50 p-8 py-14">
      <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Mi Cuenta
        </h2>
        <div className="mb-6 flex flex-col items-center">
          <div className="relative">
            <Image
              src={profileImage}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border-2 border-white object-cover shadow-lg"
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white transition-colors duration-200 hover:bg-blue-600"
            >
              <FaEdit size={16} />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            <FaUser className="mr-2 inline" />
            Nombre
          </label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          ) : (
            <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2">
              <span className="text-sm">{name}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaEdit size={16} />
              </button>
            </div>
          )}
        </div>
        {isEditing && (
          <button
            onClick={handleNameSubmit}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Guardar
          </button>
        )}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            <FaEnvelope className="mr-2 inline" />
            Email
          </label>
          <div className="rounded-md border border-gray-300 bg-white px-3 py-2">
            <span className="text-sm">{session.user.email}</span>
          </div>
        </div>
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
