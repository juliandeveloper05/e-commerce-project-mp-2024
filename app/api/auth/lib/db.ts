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
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(url, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

async function checkConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const connectedClient = await clientPromise;
    console.log('Client promise resolved, attempting to ping database...');
    await connectedClient.db().command({ ping: 1 });
    console.log('Successfully connected to MongoDB for NextAuth');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return false;
  }
}

checkConnection().then((result) => {
  console.log('MongoDB connection check result:', result);
});

export default clientPromise;

export async function getMongoClient(): Promise<MongoClient> {
  return await clientPromise;
}
