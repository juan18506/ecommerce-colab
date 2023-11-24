const express = require('express');
const cart = express.Router();

const cartController = require('../controllers/cartController');

cart.get('/', cartController.getCart);
cart.delete('/:id', cartController.deleteCartProduct);
cart.patch('/:id', cartController.updateProductCount);
cart.get('/buy.json', cartController.getCartBuy);

module.exports = cart;
