const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body || {};

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide name, email and password' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Hash the password
    if (typeof password !== 'string') {
      return res.status(400).json({ msg: 'Password must be a string' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();

    // Create and return a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment');
      return res.status(500).json({ msg: 'Server configuration error' });
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error('Error signing JWT:', err);
        return res.status(500).json({ msg: 'Error creating token' });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide email and password' });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment');
      return res.status(500).json({ msg: 'Server configuration error' });
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        console.error('Error signing JWT:', err);
        return res.status(500).json({ msg: 'Error creating token' });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  registerUser,
  loginUser,
};