const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const { category, search, minRating, sortBy } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }
    
    let sortOption = {};
    if (sortBy === 'price-low') sortOption.price = 1;
    else if (sortBy === 'price-high') sortOption.price = -1;
    else if (sortBy === 'rating') sortOption.rating = -1;
    else sortOption.title = 1;
    
    const products = await Product.find(query).sort(sortOption);
    
    res.json({
      data: {
        products
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({
      data: {
        product
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
