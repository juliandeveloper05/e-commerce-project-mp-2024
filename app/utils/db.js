import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = {};

export async function connectDb() {
  if (connection.isConnected) {
    console.log('Ya está conectado a la base de datos');
    return mongoose.connection;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Usando la conexión previa a la base de datos');
      return mongoose.connection;
    }
    await mongoose.disconnect();
  }

  if (!process.env.MONGODB_URL) {
    console.log('MONGODB_URL no está definido en las variables de entorno');
    throw new Error('MONGODB_URL no está definido en las variables de entorno');
  }

  console.log(
    'Intentando conectar a MongoDB con URL:',
    process.env.MONGODB_URL,
  );

  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Nueva conexión a la base de datos');
  connection.isConnected = db.connections[0].readyState;

  return mongoose.connection;
}

export async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('No se desconectó de la base de datos');
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;
