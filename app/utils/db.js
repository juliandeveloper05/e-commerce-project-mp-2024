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
      console.log('Using previous connection to the database');
      return;
    }
    await mongoose.disconnect();
  }

  if (!process.env.MONGODB_URL) {
    console.log('MONGODB_URL is not defined in the environment variables');
    throw new Error('MONGODB_URL is not defined in the environment variables');
  }

  console.log(
    'Trying to connect to MongoDB with URL:',
    process.env.MONGODB_URL,
  );

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('New connection to the database');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw new Error('Error connecting to the database');
  }
}

export async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not disconnecting from the database');
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;
