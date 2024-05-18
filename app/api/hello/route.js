import { connectDb } from '../../../utils/db';

export async function GET(request) {
  await connectDb(); // Asegúrate de usar await ya que connectDb es una función async
  return new Response(JSON.stringify({ name: 'John Doe' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
