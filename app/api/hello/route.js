import { connectDb, disconnectDb } from '../../../utils/db';

export async function GET() {
  try {
    await connectDb();
    console.log('Conexión a MongoDB establecida');

    const response = {
      name: 'John Doe',
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  } finally {
    await disconnectDb();
  }
}
