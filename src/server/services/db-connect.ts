import mongoose from 'mongoose';

import { env } from '~/env';

// define the database name
const DATABASE_NAME = 'skill-edge-db';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to database');
    return;
  }

  try {
    const db = await mongoose.connect(env.MONGODB_URI, {
      dbName: DATABASE_NAME,
    });

    connection.isConnected = db.connections[0].readyState;

    console.log('DB Connected Successfully!');
  } catch (error) {
    console.log('Database Connection Failed', error);
    process.exit(1);
  }
}

export default dbConnect;
