import mongoose from 'mongoose';
import { config } from '../../config/env';

interface GlobalMongo {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongo | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Usando conexión existente a MongoDB');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(config.mongodb.url, opts)
      .then((mongoose) => {
        console.log('Nueva conexión a MongoDB establecida');
        return mongoose;
      })
      .catch((error) => {
        console.error('Error al conectar con MongoDB:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

async function dbDisconnect() {
  try {
    if (cached.conn) {
      await mongoose.disconnect();
      cached.conn = null;
      cached.promise = null;
      console.log('Desconexión exitosa de MongoDB');
    }
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', error);
    throw error;
  }
}

export { dbConnect, dbDisconnect };
