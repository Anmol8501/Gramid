import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local or Vercel settings");
}

if (!process.env.DB_NAME) {
  throw new Error("❌ Please define the DB_NAME environment variable inside .env.local or Vercel settings");
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let clientPromise;

// Use a cached connection in development to prevent multiple connections
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

/**
 * Get the database instance
 */
export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}

/**
 * Find documents in a collection
 * @param {string} collection - Collection name
 * @param {object} query - MongoDB query object
 */
export async function dbFind(collection, query = {}) {
  const db = await getDb();
  return db.collection(collection).find(query).toArray();
}

/**
 * Insert one document into a collection
 * @param {string} collection - Collection name
 * @param {object} data - Document to insert
 */
export async function dbInsert(collection, data) {
  const db = await getDb();
  return db.collection(collection).insertOne(data);
}

// Default export if you just need the client connection
export default clientPromise;

