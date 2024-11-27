const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();

    console.log('User saved successfully:', savedUser.email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in registration route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User logged in successfully:', user.email);
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error in login route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
