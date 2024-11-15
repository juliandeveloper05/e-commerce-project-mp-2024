// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../utils/db';
import Product from '../../../model/Product';
import { FlattenedProduct } from '../../../types/product';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await dbConnect();

    const product = await Product.findOne({ slug: params.slug })
      .select('name price description imageSrc sizes slug imageSwiper')
      .lean<FlattenedProduct>();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create a safe copy of the product with guaranteed arrays
    const safeProduct = {
      ...product,
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      imageSwiper: Array.isArray(product.imageSwiper)
        ? product.imageSwiper
        : [],
    };

    return NextResponse.json(safeProduct);
  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
