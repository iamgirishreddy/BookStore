const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');


router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne().populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }
    
    res.json({ data: { cart } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    let cart = await Cart.findOne();
    
    if (!cart) {
      cart = await Cart.create({ items: [] });
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


router.put('/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const cart = await Cart.findOne();
    
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


router.delete('/remove/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne();
    
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


router.delete('/clear', async (req, res) => {
  try {
    const cart = await Cart.findOne();
    
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
