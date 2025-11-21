// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

let uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add MONGODB_URI to your .env.local");
}

uri = uri.trim().replace(/^["']|["']$/g, '');

const uriMatch = uri.match(/^mongodb\+srv:\/\/[^/]+(\/([^?]+))?(\?.*)?$/);
const hasDbInPath = uriMatch && uriMatch[2] && uriMatch[2].length > 0;

if (process.env.MONGODB_DB && !hasDbInPath) {
  const dbName = process.env.MONGODB_DB.trim().replace(/^["']|["']$/g, '');
  // Insert database name before query parameters
  if (uri.includes('?')) {
    // Replace /? with /dbname? or //? with //dbname?
    uri = uri.replace(/\/(\?)/, `/${dbName}$1`);
  } else {
    // Add /dbname if no query params
    uri = `${uri}/${dbName}`;
  }
}

// Ensure retryWrites and w parameters are in the connection string
if (!uri.includes('retryWrites')) {
  uri += (uri.includes('?') ? '&' : '?') + 'retryWrites=true&w=majority';
}

const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,

  ...(uri.startsWith('mongodb+srv://') ? {} : {
    tls: true,
  }),
};

// Global is used here to maintain a cached connection in dev
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
