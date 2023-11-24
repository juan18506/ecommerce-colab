const express = require('express');
const cart = express.Router();

const cartController = require('../controllers/cartController');

cart.get('/buy.json', cartController.getCartBuy);

module.exports = cart;
