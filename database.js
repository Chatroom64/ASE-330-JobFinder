import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("JobFinderDB");
    console.log("MongoDB connected");
    return db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

function getDB() {
  if (!db) throw new Error("DB not connected. Call connectDB() first.");
  return db;
}

async function getCollectionData(collectionName, query = {}, options = {}) {
  const collection = getDB().collection(collectionName);
  return await collection.find(query, options).toArray();
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await client.close();
  console.log("MongoDB disconnected");
  process.exit(0);
});

export { connectDB, getCollectionData, getDB };
