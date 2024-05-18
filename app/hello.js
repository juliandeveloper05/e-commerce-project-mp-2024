// Importa la función connectDb desde el archivo db.js ubicado en la carpeta utils
import { connectDb } from '../utils/db';

// Define la función manejadora para las solicitudes HTTP
export default function handler(req, res) {
  // Llama a la función connectDb para asegurar una conexión a la base de datos
  connectDb();

  // Envía una respuesta HTTP con un estado 200 (OK) y un objeto JSON que contiene { name: 'John Doe' }
  res.status(200).json({ name: 'John Doe' });
}
