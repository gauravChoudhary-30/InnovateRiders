const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const csvFileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  // Define other fields as needed
});

const CSVFile = mongoose.model('CSVFile', csvFileSchema);
console.log(CSVFile);

// API endpoint to fetch CSV file details
app.get('/csvfiles', async (req, res) => {
  try {
    const csvFiles = await CSVFile.find();
    res.json(csvFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
