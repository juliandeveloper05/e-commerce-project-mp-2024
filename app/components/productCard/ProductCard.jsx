import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const ProductCard = () => {
  return (
    <Link href="/product/1">
      <Image
        className="w-full"
        src="/productCard/product1.webp"
        alt="Product Image"
        width={500}
        height={500}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">Product Name</h2>
      </div>
    </Link>
  );
};

export default ProductCard;
