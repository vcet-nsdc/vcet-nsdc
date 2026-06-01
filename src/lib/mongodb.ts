import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Cache the connection across hot reloads in dev
const globalWithMongoose = globalThis as typeof globalThis & { _mongooseCache?: MongooseCache };

if (!globalWithMongoose._mongooseCache) {
  globalWithMongoose._mongooseCache = { conn: null, promise: null };
}

const cached = globalWithMongoose._mongooseCache;

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,  // Fail fast instead of waiting 30s+
      connectTimeoutMS: 10000,
      socketTimeoutMS: 20000,
      maxPoolSize: 10,  // Bound concurrent connections (serverless-friendly)
      minPoolSize: 0,
      family: 4,  // Force IPv4 — fixes SRV ETIMEOUT on many networks
    }).then(m => m).catch(err => {
      // Reset the promise so the next request retries
      cached.promise = null;
      throw err;
    });
  }

  cached.conn = await cached.promise
  return cached.conn
}