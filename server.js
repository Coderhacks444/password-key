import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for MongoDB
const DataSchema = new mongoose.Schema({
  name: String,
  value: Number
});

const DataModel = mongoose.model('Data', DataSchema);

// API endpoints
app.get('/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data', error: err });
  }
});

app.post('/data', async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ message: 'Error saving data', error: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Frontend fetch method example
function fetchData() {
  fetch('http://localhost:5173/data')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('Fetched data:', data))
    .catch(error => console.error('Fetch error:', error));
}

export default fetchData;
