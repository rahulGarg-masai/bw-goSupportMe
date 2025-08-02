const Order = require('../models/Order');
const Product = require('../models/Product');

exports.placeOrder = async (req, res, next) => {
  try {
    const { userId, products } = req.body;
    
    let totalAmount = 0;
    
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      totalAmount += product.price * item.quantity;
    }
    
    const order = await Order.create({
      userId,
      products,
      totalAmount
    });
    
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('userId')
      .populate('products.productId');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};