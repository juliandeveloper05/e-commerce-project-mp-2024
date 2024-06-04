import React from 'react';
import Image from 'next/image';
import FancyButton from './ui/Fancy-Button';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="hero flex flex-col items-center justify-center p-4 md:flex-row md:p-14">
      {/*TEXTO*/}

      <div className="md:w-1/2 md:pr-8">
        <h1 className="leading-noose my-5 text-3xl font-semibold md:text-4xl">
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

        <div className="flex justify-center md:justify-start">
          <FancyButton text="Descargue el Catalago" icon={undefined} />
        </div>
      </div>

      {/*IMAGEN*/}

      <div className="mt-8 flex justify-center md:mt-0 md:w-1/2">
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
