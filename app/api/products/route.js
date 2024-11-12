import { NextResponse } from 'next/server';
import { dbConnect } from '../../utils/db';
import Product from '../../model/Product';

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .select('_id name price imageSrc slug');

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { error: 'Error al cargar los productos' },
      { status: 500 },
    );
  }
}
