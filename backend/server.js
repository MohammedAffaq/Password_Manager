const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

// Connection URL
const url = process.env.MONGODB_URI
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())



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


async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

startServer();