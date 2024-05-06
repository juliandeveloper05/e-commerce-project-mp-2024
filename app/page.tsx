import React from 'react';
import Image from 'next/image';
import Right from '@/app/ui/Right';
import FancyButton from './ui/Fancy-Button';

export default function Page() {
  return (
    <main className="hero grid grid-cols-1 items-center gap-8 p-14 md:grid-cols-2">
      {/*TEXTO*/}

      <div className="py-8">
        <h1 className="leading-noose my-5 text-4xl font-semibold">
          Abraza la calidez, escapa del frío con{' '}
          <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent ">
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
          <FancyButton text="Última Colección" icon={undefined}></FancyButton>
        </div>
      </div>

      {/*IMAGEN*/}

      <div className="relative mx-auto md:h-[400px] md:w-[400px]">
        <Image
          src="/logo3.jpg"
          alt="pantuflas"
          objectFit="contain"
          width={480}
          height={720}
          layout="responsive"
          className="rounded-full"
        />
      </div>
    </main>
  );
}
