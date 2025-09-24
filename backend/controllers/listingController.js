const Listing = require("../models/listing.js");

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({}).populate("user", "name email");
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createListing = async (req, res) => {
  const { title, description, price, category } = req.body;
  try {
    const newListing = new Listing({
      title,
      description,
      price,
      category,
      user: req.user.id, // Comes from the auth middleware
    });

    const listing = await newListing.save();
    res.json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllListings,
  createListing,
};
