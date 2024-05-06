import React from 'react';
import Image from 'next/image';
import Right from '@/app/ui/Right';

export default function Page() {
  return (
    <main className="grid grid-cols-1 items-center gap-8 p-14 md:grid-cols-2">
      {/*TEXTO*/}

      <div className="py-8">
        <h1 className="my-5 text-4xl font-semibold">
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

        <div className="flex flex-col justify-start gap-4 px-12  md:flex-row">
          <button className="bg-primary flex items-center gap-2 rounded-full px-4 py-2 text-sm uppercase text-white md:px-8">
            Compre ya
            <Right className="h-6 w-6" />
          </button>
          <button className="flex gap-2 rounded-full  px-2 py-2 font-semibold text-gray-800 md:px-8">
            Contactanos
            <Right className="h-6 w-6" />
          </button>
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
        />
      </div>
    </main>
  );
}
