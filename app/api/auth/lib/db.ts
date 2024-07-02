// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URL"');
}

const url = process.env.MONGODB_URL;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // En modo desarrollo, usa una variable global para preservar el valor
  // a través de recargas de módulos causadas por HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(url, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // En modo producción, es mejor no usar una variable global.
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

// Función para verificar la conexión
async function checkConnection() {
  try {
    const connectedClient = await clientPromise;
    await connectedClient.db().command({ ping: 1 });
    console.log('Successfully connected to MongoDB for NextAuth');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return false;
  }
}

// Verifica la conexión al iniciar
checkConnection();

// Exporta la promesa del MongoClient con alcance de módulo.
// Al hacer esto en un módulo separado, el cliente puede ser compartido entre funciones.
export default clientPromise;

// Para uso con NextAuth, exporta una función que devuelve el cliente conectado
export async function getMongoClient(): Promise<MongoClient> {
  return await clientPromise;
}
