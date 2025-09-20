import { MongoClient, ObjectId } from 'mongodb';
import { devDbInsert, devDbFind } from './devDatabase.js';

let client;
let db;

export const dbConnect = async () => {
    if (!client) {
        // Use local MongoDB for development if no URI is provided
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
        console.log('Connecting to MongoDB:', mongoUri);
        
        try {
            client = new MongoClient(mongoUri);
            await client.connect();
            db = client.db("agro-tech");
            console.log('Successfully connected to MongoDB');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
    }

    return db;
};

export const dbInsert = async (collection, data) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collection).insertOne(data);
        console.log('User inserted successfully:', result.insertedId);
        return {result: result, ok: 1};
    }catch(err) {
        console.error('MongoDB insert error, using development database:', err.message);
        // Fallback to development database
        return await devDbInsert(collection, data);
    }
}

export const dbFind = async (collection, query) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collection).findOne(query);
        console.log('Database query:', query, 'Result:', result ? 'Found' : 'Not found');
        if(!result) {
            return {message: 'No user', ok: 0};
        }
        return {result: result, ok: 1};
    }catch(err) {
        console.error('MongoDB find error, using development database:', err.message);
        // Fallback to development database
        return await devDbFind(collection, query);
    }
}

export const dbFindAll = async (collection, query) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collection).find(query).toArray();
        if (result.length === 0) {
            return { message: "No blogs found", ok: 0, result: [] };
        }
        return { result, ok: 1 };
    } catch (err) {
        console.log(err);
        return { error: err, ok: 0 };
    }
}

export const dbFindID = async (collectionName, id) => {
    try {
        const db = await dbConnect();
        const result = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });

        if (!result) {
            return { message: "No product found", ok: 0 };
        }

        return { result, ok: 1 };
    } catch (err) {
        console.error("Database error:", err);
        return { error: err.message, ok: 0 };
    }
};