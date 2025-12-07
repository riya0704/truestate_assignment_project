import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://riya:riya@cluster0.mgxhkjy.mongodb.net/?appName=Cluster0';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db('truestate');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('transactions');
    const count = await collection.countDocuments();

    res.status(200).json({ ok: true, count });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
