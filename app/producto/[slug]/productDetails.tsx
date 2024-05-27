'use client';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from 'react-icons/fa';
import Image from 'next/image';
import useSWR from 'swr';

interface ProductProps {
  _id: string;
  name: string;
  slug: string;
  price: number;
  imageSrc: string;
  description?: string;
}

interface ProductDetailsProps {
  slug: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const { data: product, error } = useSWR<ProductProps>(
    `/api/products/${slug}`,
    fetcher,
  );

  if (error) {
    return <div>Error al cargar el producto</div>;
  }

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="mb-8 md:mb-0 md:mr-8">
          {/* IMAGEN */}
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={400}
            height={400}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          {/* DESCRIPCION */}
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-2xl font-semibold">${product.price}</p>
          <p className="mb-8 text-gray-700">
            {product.description || 'Sin descripción'}
          </p>
          <div className="mb-8 flex items-center">
            {/* BOTONES */}

            <div className="mr-4 flex items-center rounded border ">
              <button className="border-grey-500 rounded-l  border-black bg-gray-200 px-4 py-3">
                -
              </button>
              <span className="white white border-white px-4 py-3">5</span>
              <button className="white border-grey-500 rounded-r border-l bg-gray-200 px-4 py-3">
                +
              </button>
            </div>
            <button className="flex items-center rounded-md bg-purple-600 px-6 py-3 font-semibold text-white">
              <FaCartPlus className="mr-2" size={20} /> Agregar al Carrito
            </button>
          </div>
          {/* REDES SOCIALES */}
          <div className="flex items-center border-t border-gray-300 pt-4">
            <p className="mr-4 text-gray-700">Compartir:</p>
            <div className="flex space-x-5">
              <FaFacebookF className="text-blue-600" size={16} />
              <FaTwitter className="text-blue-400" size={16} />
              <FaInstagram className="text-pink-500" size={16} />
              <FaLinkedinIn className="text-blue-700" size={16} />
              <FaPinterest className="text-red-600" size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
