const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

// GET user orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json({ data: { orders } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET order by ID
router.get('/:orderId', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json({ data: { order } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new order
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }
    
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: 'Shipped'
    });
    
    // Clear cart after order
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] }
    );
    
    await order.populate('items.product');
    
    res.status(201).json({ data: { order } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
