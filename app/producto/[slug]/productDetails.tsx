'use client';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from 'react-icons/fa';
import useSWR from 'swr';
import ProductDetailsCarousel from './ProductDetailsCarousel';
import rosecat1 from '../../../public/productCard/rosecat/rosecat1.jpg';
import rosecat2 from '../../../public/productCard/rosecat/rosecat2.jpg';
import rosecat3 from '../../../public/productCard/rosecat/rosecat3.jpg';
import Share from './Share/Share';

interface ProductProps {
  _id: string;
  name: string;
  slug: string;
  price: number;
  imageSrc: string;
  imageSwiper: string[];
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
        <ProductDetailsCarousel
          mainImage={product.imageSrc}
          images={[rosecat1.src, rosecat2.src, rosecat3.src]}
        />
        <div>
          {/* DESCRIPCIÓN */}
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-2xl font-semibold">${product.price}</p>
          <p className="mb-8 text-gray-700">
            {product.description || 'Sin descripción'}
          </p>
          <div className="mb-8 flex items-center">
            {/* BOTONES */}
            <div className="mr-4 flex items-center rounded border">
              <button className="border-grey-500 rounded-l border-black bg-gray-200 px-4 py-3">
                -
              </button>
              <span className="white border-white px-4 py-3">5</span>
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
            <div className="flex space-x-5">
              <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
