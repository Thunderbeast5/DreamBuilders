import mongoose from 'mongoose';

async function maybeUseInMemoryMongo() {
  const wantMemory =
    process.env.USE_IN_MEMORY_DB === 'true' ||
    (!process.env.MONGO_URI && process.env.NODE_ENV !== 'production');

  if (!wantMemory) return null;

  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create({
    instance: { dbName: process.env.MONGO_DB_NAME || 'dreambuilders' },
  });

  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;
  console.log('🧪 Using in-memory MongoDB for development');
  return mongod;
}

const connectDB = async () => {
  try {
    const mongod = await maybeUseInMemoryMongo();
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return mongod;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
