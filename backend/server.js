import express from 'express'
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

dotenv.config()

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(bodyParser.json())

if (process.env.NODE_ENV != "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }))
}



app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})



// Save the password 
app.post('/', async (req, res) => {
  const password = req.body  
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success:true , result: findResult})
})

// Delete the password
app.delete('/', async (req, res) => {
  const password = req.body  
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success:true , result: findResult})
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}


async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

startServer();