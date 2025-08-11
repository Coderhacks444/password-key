const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');




const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);



const dbName = 'passop';
const port = 3000
const app = express()
app.use(bodyParser.json())
app.use(cors());

client.connect();
 // Insert a single document help get
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
   res.json(findResult)
})
//Save password
app.post('/', async (req, res) => {
 
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne({password});
  res.send({success : true, result: findResult})  
})

// delete password
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne({password});
  res.send({success : true, result: findResult})  
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})