// backend/server.js
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('UniMarket backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Server is running on: http://localhost:${PORT}`);
});