// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../utils/db';
import Product from '../../../model/Product';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  try {
    // Validate slug parameter
    if (!params.slug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 },
      );
    }

    // Connect to database
    await dbConnect();

    // Find product by slug with specific field selection
    const product = await Product.findOne({ slug: params.slug })
      .select('name price description imageSrc sizes slug imageSwiper')
      .lean();

    // Handle product not found
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Add cache headers for better performance
    const headers = {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
    };

    // Return successful response
    return NextResponse.json(product, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[Product API] Error fetching product:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
