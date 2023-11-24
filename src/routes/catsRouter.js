const express = require('express');
const userCart = express.Router();

const catsController = require('../controllers/catsController');

userCart.get('/', catsController.getCats);

module.exports = userCart;