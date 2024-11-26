// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/app/utils/db';
import Product from '@/app/model/Product';
import type { FlattenedProduct } from '@/app/types/product';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    // Conectar a la base de datos
    await dbConnect();

    // Obtener el producto por slug
    const product = await Product.findOne({ slug: params.slug });

    // Si no se encuentra el producto
    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 },
      );
    }

    // Convertir el documento de Mongoose a un objeto plano
    const flattenedProduct: FlattenedProduct = {
      _id: product._id.toString(),
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      imageSrc: product.imageSrc,
      imageSwiper: product.imageSwiper,
      images: product.images,
      category: product.category,
      subcategory: product.subcategory,
      tags: product.tags,
      sizes: product.sizes,
      variants: product.variants,
      specifications: product.specifications,
      stock: product.stock,
      sku: product.sku,
      status: product.status,
      featured: product.featured,
      reviews: product.reviews,
      rating: product.rating,
      seo: product.seo,
      metadata: {
        createdBy: product.metadata?.createdBy,
        updatedBy: product.metadata?.updatedBy,
        publishedAt: product.metadata?.publishedAt,
      },
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    // Retornar la respuesta exitosa
    return NextResponse.json(flattenedProduct, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);

    // Manejar diferentes tipos de errores
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Error por defecto
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await dbConnect();

    const body = await request.json();

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: params.slug },
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await dbConnect();

    const deletedProduct = await Product.findOneAndDelete({
      slug: params.slug,
    });

    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Producto eliminado correctamente' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting product:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}

// Configuración de CORS y cache para la ruta
export const config = {
  api: {
    bodyParser: true,
  },
  cors: {
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || '*',
    methods: ['GET', 'PUT', 'DELETE'],
  },
  cache: 'no-store',
};

// Función auxiliar para validar el cuerpo de la solicitud
const validateRequestBody = (body: any) => {
  const requiredFields = ['name', 'price', 'imageSrc'];
  for (const field of requiredFields) {
    if (!body[field]) {
      throw new Error(`El campo ${field} es requerido`);
    }
  }
};

// Función auxiliar para sanitizar datos
const sanitizeProduct = (product: any) => {
  // Eliminar campos sensibles o innecesarios
  const sanitized = { ...product };
  delete sanitized.__v;
  delete sanitized.metadata?.internalNotes;
  return sanitized;
};
