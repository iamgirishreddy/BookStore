const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const { protect } = require('../middleware/auth');

// GET user wishlist
router.get('/', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }
    
    res.json({ data: { wishlist } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD to wishlist
router.post('/add', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }
    
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
    
    await wishlist.populate('products');
    
    res.json({ data: { wishlist } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REMOVE from wishlist
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== req.params.productId);
      await wishlist.save();
      await wishlist.populate('products');
    }
    
    res.json({ data: { wishlist } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
