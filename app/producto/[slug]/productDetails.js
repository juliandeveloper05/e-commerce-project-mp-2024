'use client';
import { FaCartPlus } from 'react-icons/fa';
import useSWR from 'swr';
import Share from './Share/Share';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { BsHeart } from 'react-icons/bs';
import styles from './detail.modules.scss';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductDetails = ({ slug }) => {
  const { data: product, error } = useSWR(`/api/products/${slug}`, fetcher);
  const router = useRouter();

  if (error) {
    return <div>Error al cargar el producto</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {!product ? (
        <ClipLoader color="#9333ea" size={80} />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center ">
            <div className="h-auto w-full">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="h-auto w-full rounded object-cover"
              />
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h1 className="mb-4 text-center text-3xl font-bold md:text-left">
                {product.name}
              </h1>
              <p className="mb-4 text-center text-2xl font-semibold md:text-left">
                ${product.price}
              </p>
              <p className="mb-8 text-center text-gray-700 md:text-left">
                {product.description || 'Sin descripción'}
              </p>
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
                      <div
                        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black border-opacity-50 text-gray-700 hover:bg-purple-600 hover:text-white ${
                          i == (router?.query?.size ? router.query.size : '')
                        }`}
                      >
                        {size.size}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className=" -mr-0 mb-4 flex w-full items-center justify-center rounded md:mb-12 ">
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
                  <button className="flex h-14 w-full items-center justify-center gap-2 rounded-md border border-black bg-gray-800 text-base font-semibold  text-white hover:bg-transparent hover:text-gray-800">
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
      )}
    </div>
  );
};

export default ProductDetails;
