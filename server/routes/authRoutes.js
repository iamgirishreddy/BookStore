const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// REGISTER user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({ name, email, password, phone });
    
    res.status(201).json({
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (user && (await user.comparePassword(password))) {
      res.json({
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
          },
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ data: { user } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD address
router.post('/address', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (req.body.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }
    
    user.addresses.push(req.body);
    await user.save();
    
    res.json({ data: { user } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE address
router.put('/address/:addressId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    if (req.body.isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }
    
    Object.assign(address, req.body);
    await user.save();
    
    res.json({ data: { user } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE address
router.delete('/address/:addressId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.addressId);
    await user.save();
    
    res.json({ data: { user } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
