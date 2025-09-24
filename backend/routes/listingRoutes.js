const express = require("express");
const router = express.Router();
const {
  getAllListings,
  createListing,
} = require("../controllers/listingController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllListings);

router.post("/", protect, createListing);

module.exports = router;
