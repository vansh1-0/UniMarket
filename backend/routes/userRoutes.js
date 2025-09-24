var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/user.js");

router.post("/register", function (req, res, next) {
  var { name, email, password } = req.body;

  if (!name || !email || !password) {
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
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newUser.password, salt, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(function (user) {
            jwt.sign(
              { user: { id: user.id } },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              function (err, token) {
                if (err) throw err;
                res.json({
                  token: token,
                  user: { id: user.id, name: user.name, email: user.email },
                });
              }
            );
          })
          .catch(function (err) {
            console.error("Error saving user to database:", err);
            res.status(500).json({ msg: "Server error: Could not save user." });
          });
      });
    });
  });
});

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
            user: { id: user.id, name: user.name, email: user.email },
          });
        }
      );
    });
  });
});

module.exports = router;
