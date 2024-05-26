import { connectDb, disconnectDb } from '../../../utils/db';
import Product from '../..../../../../model/Product';

export async function GET(request) {
  const slug = request.nextUrl.pathname.split('/').pop();

  try {
    await connectDb();
    const product = await Product.findOne({ slug });

    if (!product) {
      return new Response(JSON.stringify({ error: 'Producto no encontrado' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.error('Error al obtener el producto:', err);
    return new Response(JSON.stringify({ error: 'Error en el servidor' }), {
      status: 500,
    });
  } finally {
    await disconnectDb();
  }
}
