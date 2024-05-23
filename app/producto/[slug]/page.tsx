type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  return <span>slug: {params.slug}</span>;
}

// export async function getServerSideProps(context) {
//   const { query } = context;
//   const slug = query.slug;
//   const style = query.style;
//   const size = query.size || 0;
//   connectDb();
//   //------------
//   let product = await Product.findOne({ slug }).lean();
//   let subProduct = product.subProducts[style];
//   let prices = subProduct.sizes
//     .map((s) => {
//       return s.price;
//     })
//     .sort((a, b) => {
//       return a - b;
//     });
//   console.log(subProduct);
//   let newProduct = {
//     ...product,
//     images: subProduct.images,
//     images: subPorduct.sizes,
//     discount: subProduct.discount,
//     sku: subProduct.sku,
//     colors: product.subProducts.map((p) => {
//       return p.color;
//     }),
//     priceRange:
//       prices.length > 1
//         ? `From ${prices[0]} to ${prices[prices.length - 1]}$`
//         : '',
//   };
//   //------------
//   console.log('new product', newProduct);
//   disconnectDb();

//   return { props: {} };
// }
