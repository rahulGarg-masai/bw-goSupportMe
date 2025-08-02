const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  deleteOrder
} = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);

module.exports = router;