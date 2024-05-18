import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connection = {};

export async function connectDb() {
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous connection to the database');
      return;
    }
    await mongoose.disconnect();
  }

  if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL is not defined in the environment variables');
  }

  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('New connection to the database');
  connection.isConnected = db.connections[0].readyState;
}
