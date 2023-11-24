const express = require('express');
const catsProducts = express.Router();

const catsProductsController = require('../controllers/catsProductsController');

catsProducts.get('/:cat', catsProductsController.getProducts);

module.exports = catsProducts;