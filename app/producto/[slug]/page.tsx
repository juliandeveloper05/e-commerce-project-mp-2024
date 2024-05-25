import type { Metadata } from 'next';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from 'react-icons/fa';
import db from '../../utils/db';
import Product from '../../model/Product';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Producto',
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  {
    /* BASES DE DATOS */
  }

  try {
    await db.connectDb();
    const product = await Product.findOne({ slug: params.slug });
    await db.disconnectDb();

    if (!product) {
      return <div>Producto no encontrado</div>;
    }

    return (
      <div className="mx-auto max-w-7xl py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            {/* IMAGEN */}
            <Image
              src={product.imageSrc}
              alt={product.name}
              width={500}
              height={500}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            {/* DESCRIPCION */}

            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
            <p className="mb-4 text-2xl font-semibold">${product.price}</p>
            <p className="mb-8 text-gray-700">Product Description</p>
            <div className="mb-8 flex items-center">
              <div className="mr-4 flex items-center">
                {/* BOTONES */}

                <button className="rounded-l bg-gray-200 px-4 py-3">-</button>
                <span className="bg-gray-200 px-4 py-3">5</span>
                <button className="rounded-r bg-gray-200 px-4 py-3">+</button>
              </div>
              <button className="flex items-center rounded-md bg-purple-600 px-6 py-3 font-semibold text-white">
                <FaCartPlus className="mr-2" size={20} /> ADD TO CART
              </button>
            </div>

            {/* REDES SOCIALES*/}

            <div className="flex items-center border-t border-gray-300 pt-4">
              <p className="mr-4 text-gray-700">Share:</p>
              <div className="flex">
                <FaFacebookF className="mr-2 text-blue-600" size={16} />
                <FaTwitter className="mr-2 text-blue-400" size={16} />
                <FaInstagram className="mr-2 text-pink-500" size={16} />
                <FaLinkedinIn className="mr-2 text-blue-700" size={16} />
                <FaPinterest className="text-red-600" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error('Error al obtener el producto:', err);
    return <div>Error al cargar el producto</div>;
  }
}
