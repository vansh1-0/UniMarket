const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);

app.use(function (req, res, next) {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    // Provide stack trace only in development
    error: req.app.get("env") === "development" ? err.stack : {},
  });
});

app.get("/", function (req, res) {
  res.send("UniMarket API is running successfully!");
});

console.log("\n\nServer started on http://localhost:5000\n\n");

module.exports = app;
