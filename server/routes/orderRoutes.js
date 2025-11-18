const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');


router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json({ data: { orders } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ data: { order } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    
    const order = await Order.create({
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: 'Shipped'
    });
    

    const cart = await Cart.findOne();
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    
    await order.populate('items.product');
    
    res.status(201).json({ data: { order } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
