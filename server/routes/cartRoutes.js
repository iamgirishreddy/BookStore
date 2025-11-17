const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// GET user cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    
    res.json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD item to cart
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE item quantity
router.put('/update', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REMOVE item from cart
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CLEAR cart
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    res.json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
