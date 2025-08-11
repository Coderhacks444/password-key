
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/passwordManager';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for passwords
const passwordSchema = new mongoose.Schema({
  website: String,
  username: String,
  password: String
});

const Password = mongoose.model('Password', passwordSchema);

// API Endpoints
app.get('/api/passwords', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving passwords', error: err });
  }
});

app.post('/api/passwords', async (req, res) => {
  try {
    const newPassword = new Password(req.body);
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (err) {
    res.status(500).json({ message: 'Error saving password', error: err });
  }
});

app.put('/api/passwords/:id', async (req, res) => {
  try {
    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPassword);
  } catch (err) {
    res.status(500).json({ message: 'Error updating password', error: err });
  }
});

app.delete('/api/passwords/:id', async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting password', error: err });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
