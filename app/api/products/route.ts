// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../utils/db';
import Product from '../../model/Product';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Add debug logging
  console.log('Request path:', request.nextUrl.pathname);
  console.log('Image paths being requested:', request.nextUrl.searchParams);

  try {
    await dbConnect();
    const products = await Product.find({})
      .select('name price imageSrc slug')
      .sort({ createdAt: -1 })
      .lean();

    // Log product image paths
    products.forEach((product) => {
      console.log('Product image path:', product.imageSrc);
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('[Products API] Error:', error);
    return NextResponse.json(
      { error: 'Error al cargar los productos' },
      { status: 500 },
    );
  }
}
