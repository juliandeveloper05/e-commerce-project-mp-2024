'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCardProps } from '../../types/product';

export default function ProductCard({
  _id, // Cambiamos 'id' por '_id'
  name,
  price,
  imageSrc,
  slug,
}: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
        <Link href={`/producto/${slug}`}>
          <Image
            src={imageSrc}
            alt={name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            priority
          />
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/producto/${slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">
          ${price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
