import mongoose from 'mongoose';
import { getEnvVariable } from './env';

const MONGODB_URL = getEnvVariable('MONGODB_URL');

interface GlobalMongo {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: GlobalMongo;
}

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function dbConnect() {
  try {
    if (global.mongoose.conn) {
      console.log('Using existing connection');
      return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
      const opts = {
        bufferCommands: false,
      };

      console.log('Creating new connection');
      global.mongoose.promise = mongoose.connect(MONGODB_URL, opts);
    }

    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    global.mongoose.promise = null;
    throw error;
  }
}

export async function dbDisconnect() {
  try {
    if (global.mongoose.conn) {
      await mongoose.disconnect();
      global.mongoose.conn = null;
      global.mongoose.promise = null;
      console.log('Disconnected from MongoDB');
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}
