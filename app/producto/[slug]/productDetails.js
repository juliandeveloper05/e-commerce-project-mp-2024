'use client';

import { FaCartPlus } from 'react-icons/fa';
import useSWR from 'swr';
import Share from './Share/Share';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsHeart } from 'react-icons/bs';
import ProductDetailsCarousel from './components/ProductDetailsCarousel';
import Loader from './components/Loader/Loader';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductDetails = ({ slug }) => {
  const { data: product, error } = useSWR(`/api/products/${slug}`, fetcher);
  const router = useRouter();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-600">
            Error al cargar el producto
          </h2>
          <p className="text-gray-600">
            Por favor, intente nuevamente más tarde
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader />
          <p className="animate-pulse text-2xl font-bold text-gray-600">
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="h-full w-full">
            <ProductDetailsCarousel
              mainImage={product.imageSrc}
              images={product.imageSwiper || []}
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="mb-4 text-center text-3xl font-bold md:text-left">
              {product.name}
            </h1>
            <p className="mb-8 text-center text-gray-700 md:text-left">
              {product.description || 'Sin descripción'}
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8 w-full">
                <h4 className="mb-2 text-center text-sm font-semibold text-gray-700">
                  Elige el tamaño:
                </h4>
                <div className="flex flex-wrap justify-center">
                  {product.sizes.map((size, i) => (
                    <Link
                      key={i}
                      href={`/product/${product.slug}?style=${
                        router?.query?.style ? router.query.style : ''
                      }&size=${i}`}
                      className="group mb-2 px-2"
                    >
                      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black border-opacity-50 text-gray-700 hover:bg-purple-600 hover:text-white">
                        {size.size}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4 flex w-full items-center justify-center rounded md:mb-12">
              <button className="border-grey-500 rounded-l border-black bg-gray-200 px-4 py-4 hover:bg-gray-300 hover:text-black">
                -
              </button>
              <span className="white border-white px-4 py-4">0</span>
              <button className="border-grey-500 rounded-r border-l bg-gray-200 px-4 py-4 hover:bg-gray-300 hover:text-black">
                +
              </button>
            </div>

            <div className="flex w-full flex-col items-center md:flex-row md:justify-center">
              <div className="mt-4 flex w-full flex-col gap-4 md:mt-0 md:flex-row">
                <button className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-t from-pink-200 to-blue-200 text-base font-semibold text-gray-600 hover:from-pink-300 hover:to-blue-300">
                  <FaCartPlus className="h-6 w-6" /> Comprar
                </button>
                <button className="flex h-14 w-full items-center justify-center gap-2 rounded-md border border-black bg-gray-800 text-base font-semibold text-white hover:bg-transparent hover:text-gray-800">
                  <BsHeart className="h-6 w-6" />
                  Favoritos
                </button>
              </div>
            </div>

            <div className="flex w-full items-center justify-center border-gray-300 pt-6">
              <div className="flex space-x-5">
                <Share />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
