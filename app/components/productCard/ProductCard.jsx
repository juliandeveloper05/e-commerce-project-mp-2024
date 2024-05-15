import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const ProductCard = ({ imageSrc, name, price }) => {
  return (
    <Link href="/" className="block">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <Image
          className="h-21 w-full object-cover"
          src={imageSrc}
          alt={name}
          width={300}
          height={200}
        />
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
