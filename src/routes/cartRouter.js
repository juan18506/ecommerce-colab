const express = require('express');
const cart = express.Router();

const cartController = require('../controllers/cartController');

cart.get('/', cartController.getCart);
cart.post('/', cartController.createProduct);
cart.patch('/:id', cartController.updateProductCount);
cart.delete('/:id', cartController.deleteCartProduct);
cart.get('/buy.json', cartController.getCartBuy);

module.exports = cart;
