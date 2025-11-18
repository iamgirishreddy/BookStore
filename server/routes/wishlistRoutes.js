const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

router.get('/', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne().populate('products');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ products: [] });
    }
    
    res.json({ data: { wishlist } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/add', async (req, res) => {
  try {
    const { productId } = req.body;
    
    let wishlist = await Wishlist.findOne();
    
    if (!wishlist) {
      wishlist = await Wishlist.create({ products: [] });
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


router.delete('/remove/:productId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne();
    
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
