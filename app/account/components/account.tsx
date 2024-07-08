'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaEdit, FaArrowLeft } from 'react-icons/fa';

const AccountSkeleton = () => (
  <div className="w-full max-w-md animate-pulse rounded-xl bg-white p-8 shadow-lg">
    <div className="mx-auto mb-6 h-8 w-1/2 rounded bg-gray-300"></div>
    <div className="mb-6 flex flex-col items-center">
      <div className="h-24 w-24 rounded-full bg-gray-300"></div>
    </div>
    <div className="mb-4 space-y-4">
      <div>
        <div className="mb-1 h-4 w-20 rounded bg-gray-300"></div>
        <div className="h-10 rounded-md bg-gray-300"></div>
      </div>
      <div>
        <div className="mb-1 h-4 w-20 rounded bg-gray-300"></div>
        <div className="h-10 rounded-md bg-gray-300"></div>
      </div>
    </div>
    <div className="h-10 rounded-md bg-gray-300"></div>
  </div>
);

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

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

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
      <div className="flex min-h-[calc(140vh-25rem)] w-full items-center justify-center bg-gray-100 p-4">
        <AccountSkeleton />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(140vh-25rem)] w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
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
              value={session.user.email || ''}
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
