import express from 'express';
import mongoose from 'mongoose';
import csv2json from 'json2csv';

import fs from 'fs';
const app = express();
const PORT = process.env.PORT || 6000;

// Connect to MongoDB
await mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Define schema and model for CSV data
const csvSchema = new mongoose.Schema({
  CustomerID: { type: Number, required: true },
  Churn: { type: Number, required: true },
  Tenure: { type: Number, required: true },
  Gender: { type: String, required: true },
  AppTime: { type: Number, required: true },
  Complain: { type: Number, required: true },
  OrderIncrease: { type: Number, required: true },
  OrderCount: { type: Number, required: true },
  InactiveDays: { type: Number, required: true },
  CashbackAmount: { type: Number, required: true },
  Summary: { type: String, required: true },
  Text: { type: String, required: true },
  Sentiment_Score: { type: Number, required: true }

});
// console.log(csvSchema);



const CSVModel = mongoose.model('CSVModel', csvSchema);

// Define endpoint to fetch CSV data
app.get('/fetch-csv/:customerId', async (req, res) => {
  const { customerId } = req.params;
  console.log(customerId);
  try {
    // Query MongoDB to fetch CSV data
    const csvData = await CSVModel.find({ CustomerID: customerId });
    console.log("csvData", csvData);

    // Convert JSON data to CSV format
    const csvFields = ['CustomerID', 'Churn', 'Tenure', 'Gender', 'AppTime', 'Complain', 'OrderIncrease', 'OrderCount', 'InactiveDays', 'CashbackAmount', 'Summary', 'Text', 'Sentiment_Score']; 
    // Specify fieldCs to include in CSV
    
    const rows = csvData.split('\n');    
     const headers = rows[0].split(','); 
         const jsonData = [];
         function csv2jsonParse(csvData, options) {
          const rows = csvData.split('\n');
          const headers = rows[0].split(',');
          const jsonData = [];
          for (let i = 1; i < rows.length; i++) {
            const values = rows[i].split(','); const entry = {};
            for (let j = 0; j < headers.length; j++) { entry[headers[j]] = values[j]; } jsonData.push(entry);
          }
          return jsonData;
        }

    const csv = csv2jsonParse(csvData);
    console.log(csv)

    // Set response headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

    // Send CSV data as response
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
