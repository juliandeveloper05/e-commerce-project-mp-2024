import ProductCard from '../ProductCard';
import db from '../../../utils/db';
import Product from '../../../model/Product';

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  imageSrc: string;
}

export default async function ProductsSection() {
  try {
    await db.connectDb();
    const products: Product[] = await Product.find({});
    await db.disconnectDb();

    return (
      <div>
        <div className="  my-8  mb-5 text-center text-[28px] font-semibold leading-tight  md:mt-16  md:text-[34px]">
          Todos los Productos
        </div>
        <div className="-my-1 mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:my-2 lg:grid-cols-3">
          {products.map((product: Product, index) => {
            if (product._id) {
              return (
                <ProductCard
                  key={product._id}
                  id={`product-${index}`}
                  imageSrc={product.imageSrc}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                />
              );
            } else {
              return (
                <div key={product.name}>
                  <p>Error: ID de producto no válido</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } catch (err) {
    console.error('Error al obtener los productos:', err);
    return <p>Error al cargar los productos</p>;
  }
}
