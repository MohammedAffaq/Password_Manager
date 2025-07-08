// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB
const client = new MongoClient(process.env.MONGODB_URI);
const dbName = 'passop';

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// GET all passwords
app.get('/api/passwords', async (req, res) => {
  try {
    const db = client.db(dbName);
    const data = await db.collection('passwords').find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// POST a new password
app.post('/api/passwords', async (req, res) => {
  try {
    const db = client.db(dbName);
    const result = await db.collection('passwords').insertOne(req.body);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insert failed" });
  }
});

// DELETE a password
app.delete('/api/passwords', async (req, res) => {
  try {
    const db = client.db(dbName);
    const result = await db.collection('passwords').deleteOne(req.body);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
async function start() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB Connection Failed', err);
  }
}

start();
