const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Init Middleware to accept JSON data
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('UniMarket backend is running!');
});

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});