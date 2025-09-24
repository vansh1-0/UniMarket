var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Listing = require("../models/listing.js");
var User = require("../models/user.js");

function protect(req, res, next) {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
      User.findById(decoded.user.id)
        .select("-password")
        .then(function (user) {
          req.user = user;
          next();
        })
        .catch(function (err) {
          res.status(401).json({ msg: "Not authorized" });
        });
    } catch (error) {
      res.status(401).json({ msg: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ msg: "Not authorized, no token" });
  }
}

router.get("/", function (req, res, next) {
  Listing.find({})
    .populate("user", "name email")
    .then(function (listings) {
      res.json(listings);
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

router.post("/", protect, function (req, res, next) {
  var { title, description, price, category } = req.body;
  var newListing = new Listing({
    title: title,
    description: description,
    price: price,
    category: category,
    user: req.user.id,
  });

  newListing
    .save()
    .then(function (listing) {
      res.json(listing);
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

router.put("/:id", protect, function (req, res, next) {
  Listing.findById(req.params.id)
    .then(function (listing) {
      if (!listing) {
        return res.status(404).json({ msg: "Listing not found" });
      }
      if (listing.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function (updatedListing) {
          res.json(updatedListing);
        })
        .catch(function (err) {
          res.status(500).send("Server Error");
        });
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

router.delete("/:id", protect, function (req, res, next) {
  Listing.findById(req.params.id)
    .then(function (listing) {
      if (!listing) {
        return res.status(404).json({ msg: "Listing not found" });
      }
      if (listing.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      listing
        .deleteOne()
        .then(function () {
          res.json({ msg: "Listing removed successfully" });
        })
        .catch(function (err) {
          res.status(500).send("Server Error");
        });
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

module.exports = router;
