import { NextResponse } from 'next/server';
import { dbConnect } from '../../../utils/db';
import Product from '../../../model/Product';

export async function GET({ params }) {
  const slug = params.slug;
  try {
    await dbConnect();
    const product = await Product.find()
      .sort({ createdAt: -1 })
      .select('_id name price imageSrc slug');

    return NextResponse.json(product);
  } catch (error) {
    console.error(`Error al obtener el producto ${slug}: `, error);
    return NextResponse.json(
      { error: `Error al cargar el producto ${slug}` },
      { status: 500 },
    );
  }
}
