import { MongoClient } from "mongodb";

// --- Validate ENV vars ---
if (!process.env.MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local or Vercel settings");
}
if (!process.env.DB_NAME) {
  throw new Error("❌ Please define DB_NAME in .env.local or Vercel settings");
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let clientPromise;

// ✅ Reuse connection in dev (to prevent hot-reload issues)
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
 * Get the connected database
 */
export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}

/**
 * Find documents from a collection
 */
export async function dbFind(collection, query = {}) {
  const db = await getDb();
  return db.collection(collection).find(query).toArray();
}

/**
 * Insert one document into a collection
 */
export async function dbInsert(collection, data) {
  const db = await getDb();
  return db.collection(collection).insertOne(data);
}

/**
 * Insert many documents into a collection
 */
export async function dbInsertMany(collection, docs) {
  const db = await getDb();
  return db.collection(collection).insertMany(docs);
}

/**
 * Update documents in a collection
 */
export async function dbUpdate(collection, filter, update, options = {}) {
  const db = await getDb();
  return db.collection(collection).updateMany(filter, update, options);
}

/**
 * Delete documents in a collection
 */
export async function dbDelete(collection, filter) {
  const db = await getDb();
  return db.collection(collection).deleteMany(filter);
}

// ✅ Default export is the client connection (for flexibility)
export default clientPromise;

