import React from 'react';
import Image from 'next/image';
import Right from '@/app/ui/Right';

export default function Page() {
  return (
    <main className="grid grid-cols-1 items-center gap-8 p-14 md:grid-cols-2">
      <div>
        <h1 className="my-5 text-4xl font-semibold">
          Abraza la calidez, escapa del frío con estilo
        </h1>
        <p className="my-6 text-gray-500">
          Experimenta la calidez y el estilo con nuestras pantuflas diseñadas
          para alejar el frío, ofreciendo confort y suavidad en cada paso. Deja
          atrás el frío con nuestras pantuflas llenas de estilo
        </p>
        <div className="flex flex-col justify-start gap-4 px-12  md:flex-row">
          <button className="bg-primary flex gap-2 rounded-full px-4 py-2 text-white md:px-8">
            Compre ya
            <Right className="h-6 w-6" />
          </button>
          <button className="flex gap-2 rounded-full  px-2 py-2 font-semibold text-gray-800 md:px-8">
            Contactanos
            <Right className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="[h-14] relative mx-auto max-w-xs">
        <Image
          src="/logo3.jpg"
          alt="pantuflas"
          objectFit="contain"
          width={480}
          height={480}
        />
      </div>
    </main>
  );
}
