import mongoose, { ConnectOptions } from 'mongoose';
import colors from 'colors';

// Extend the global type with mongoose custom properties
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    isConnected: boolean;
  };
}

mongoose.set('strictQuery', true);

const connectionString = process.env.MONGO_URI;
if (!connectionString) {
  throw new Error('MongoDB connection string is not defined');
}

if (!global.mongoose) {
  global.mongoose = { conn: null, isConnected: false };
}

const connectDB = async () => {
  const connect: ConnectOptions = {
    maxPoolSize: 2,
  };

  if (global.mongoose.isConnected) {
    return global.mongoose.conn;
  }

  try {
    const conn = await mongoose.connect(connectionString, connect);
    //@ts-ignore
    global.mongoose.conn = conn;
    global.mongoose.isConnected = true;
    console.info(colors.green.underline(`MongoDB Connected: ${conn.connection.host}`));
    return conn;
  } catch (error: any) {
    console.error(colors.red.underline(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
