var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var path = require("path");
var fs = require("fs");
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
  const { search, category } = req.query;
  let query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  if (category && category !== "All") {
    query.category = category;
  }
  Listing.find(query)
    .populate("user", "name email phone")
    .sort({ createdAt: -1 })
    .then(function (listings) {
      res.json(listings);
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

router.get("/my-listings", protect, function (req, res, next) {
  Listing.find({ user: req.user.id })
    .populate("user", "name email phone")
    .sort({ createdAt: -1 })
    .then(function (listings) {
      res.json(listings);
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

router.get("/:id", protect, function (req, res, next) {
  Listing.findById(req.params.id)
    .then(function (listing) {
      if (!listing) {
        return res.status(404).json({ msg: "Listing not found" });
      }
      res.json(listing);
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

router.post("/", protect, function (req, res, next) {
  const { title, description, price, category } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: 'No image was uploaded.' });
  }
  const imageFile = req.files.image;
  const fileName = Date.now() + path.extname(imageFile.name);
  const uploadPath = path.join(__dirname, '..', 'public', 'images', fileName);
  imageFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    const newListing = new Listing({
      title,
      description,
      price,
      category,
      image: '/images/' + fileName,
      user: req.user.id,
    });
    newListing.save()
      .then(listing => res.status(201).json(listing))
      .catch(err => res.status(500).send("Server Error"));
  });
});

router.put("/:id", protect, function (req, res, next) {
  const { title, description, price, category } = req.body;
  const updatedData = { title, description, price, category };

  Listing.findById(req.params.id)
    .then(function (listing) {
      if (!listing) {
        return res.status(404).json({ msg: "Listing not found" });
      }
      if (listing.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      if (req.files && req.files.image) {
        const imageFile = req.files.image;
        const newFileName = Date.now() + path.extname(imageFile.name);
        const newUploadPath = path.join(__dirname, '..', 'public', 'images', newFileName);

        const oldImagePath = path.join(__dirname, '..', 'public', listing.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }

        imageFile.mv(newUploadPath, function (err) {
          if (err) return res.status(500).send(err);
        });
        updatedData.image = '/images/' + newFileName;
      }

      Listing.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        .then(updatedListing => res.json(updatedListing))
        .catch(err => res.status(500).send("Server Error"));
    })
    .catch(err => res.status(500).send("Server Error"));
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
      const imagePath = path.join(__dirname, '..', 'public', listing.image);
      listing.deleteOne().then(() => {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
        res.json({ msg: "Listing removed successfully" });
      }).catch(err => res.status(500).send("Server Error"));
    })
    .catch(err => res.status(500).send("Server Error"));
});

module.exports = router;