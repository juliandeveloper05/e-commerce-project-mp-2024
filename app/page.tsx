import React from 'react';
import Image from 'next/image';
import FancyButton from './ui/Fancy-Button';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="hero grid grid-cols-1 items-center gap-8 p-14 md:grid-cols-2">
      {/*TEXTO*/}

      <div className="pl-12">
        <h1 className="leading-noose my-5 text-4xl font-semibold">
          Abraza la calidez, escapa del frío con{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ">
            MP PANTUFLONES
          </span>
        </h1>
        <p className="my-6 text-gray-500">
          Experimenta la calidez y el estilo con nuestras pantuflas diseñadas
          para alejar el frío, ofreciendo confort y suavidad en cada paso. Deja
          atrás el frío con nuestras pantuflas llenas de estilo
        </p>

        {/*BOTONES*/}

        <div className="flex justify-center md:block">
          <FancyButton text="Descargue el Catalago" icon={undefined} />
        </div>
      </div>

      {/*IMAGEN*/}

      <div className="h-45 w-100 relative flex justify-center">
        <Image
          src="/logo3.jpg"
          alt="pantuflas"
          objectFit="contain"
          width={420}
          height={420}
          className="cover"
        />
      </div>
    </main>
  );
}
