import { MongoClient } from 'mongodb';

let client;
let db;

export const dbConnect = async () => {
  if (!client) {
    const mongoUri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoUri) {
      throw new Error("❌ MONGODB_URI is not defined in environment variables");
    }

    if (!dbName) {
      throw new Error("❌ DB_NAME is not defined in environment variables");
    }

    try {
      client = new MongoClient(mongoUri);
      await client.connect();
      db = client.db(dbName);
      console.log(`✅ Connected to MongoDB Atlas database: ${dbName}`);
    } catch (err) {
      console.error("❌ MongoDB connection error:", err.message);
      throw err;
    }
  }
  return db;
};
