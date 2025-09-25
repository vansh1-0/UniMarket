var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/user.js");

// Middleware to protect routes
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

// Register a new user
router.post("/register", function (req, res, next) {
  var { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  User.findOne({ email: email }).then(function (user) {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    var newUser = new User({
      name: name,
      email: email,
      password: password,
      phone: phone, // Add phone number here
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(function (user) {
          jwt.sign(
            { user: { id: user.id } },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            function (err, token) {
              if (err) throw err;
              res.json({
                token: token,
                user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
              });
            }
          );
        });
      });
    });
  });
});

// Login user
router.post("/login", function (req, res, next) {
  var { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide email and password" });
  }

  User.findOne({ email: email }).then(function (user) {
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password).then(function (isMatch) {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      jwt.sign(
        { user: { id: user.id } },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        function (err, token) {
          if (err) throw err;
          res.json({
            token: token,
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone },
          });
        }
      );
    });
  });
});

// Update user profile
router.put("/profile", protect, function (req, res, next) {
  User.findById(req.user.id)
    .then(function (user) {
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone; // Allow phone update

        user
          .save()
          .then(function (updatedUser) {
            res.json({
              id: updatedUser.id,
              name: updatedUser.name,
              email: updatedUser.email,
              phone: updatedUser.phone,
            });
          })
          .catch(function (err) {
            res
              .status(400)
              .json({ msg: "Update failed. Email might already be in use." });
          });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

// Delete user profile
router.delete("/profile", protect, function (req, res, next) {
  User.findByIdAndDelete(req.user.id)
    .then(function (user) {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json({ msg: "User account deleted successfully" });
    })
    .catch(function (err) {
      res.status(500).send("Server Error");
    });
});

module.exports = router;