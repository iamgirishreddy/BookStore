const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({ category: category.name });
        return {
          name: category.name,
          displayName: category.displayName,
          count: count
        };
      })
    );
    
    res.json({
      data: {
        categories: categoriesWithCounts
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({
      data: {
        category
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
