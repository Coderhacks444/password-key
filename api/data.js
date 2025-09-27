import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/passkey';

if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGO_URI);
}

const DataSchema = new mongoose.Schema({
  encryptedData: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const DataModel = mongoose.models.Data || mongoose.model('Data', DataSchema);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const data = await DataModel.find();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const newData = new DataModel(req.body);
      await newData.save();
      return res.status(201).json(newData);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}