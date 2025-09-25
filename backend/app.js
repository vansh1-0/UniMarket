const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables and connect to the database
dotenv.config();
connectDB();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads

// Import route handlers
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");

var app = express();

// --- Middleware Configuration ---
app.use(logger("dev")); // Morgan for logging requests
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // To parse URL-encoded bodies
app.use(cookieParser()); // To parse cookies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(fileUpload()); // Enable file uploads

// Serve static files (like uploaded images) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
// --- End of Middleware ---


// --- API Route Setup ---
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
// --- End of API Routes ---

// A simple root route to confirm the API is running
app.get("/", function (req, res) {
  res.send("UniMarket API is running successfully!");
});

// Catch 404 for any routes not found
app.use(function (req, res, next) {
  res.status(404).json({
    message: "Route not found",
  });
});

// General error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    // Provide stack trace only when in the development environment
    error: req.app.get("env") === "development" ? err.stack : {},
  });
});

module.exports = app;

