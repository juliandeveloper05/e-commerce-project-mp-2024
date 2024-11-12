// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../utils/db';
import Product from '../../model/Product';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Connect to database
    await dbConnect();

    // Get all products with specific field selection
    const products = await Product.find({})
      .select('name price imageSrc slug')
      .sort({ createdAt: -1 })
      .lean();

    // Handle no products found
    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: 'No products found' },
        { status: 404 },
      );
    }

    // Add cache headers for better performance
    const headers = {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=59',
    };

    return NextResponse.json(products, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[Products API] Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al cargar los productos' },
      { status: 500 },
    );
  }
}
