const express = require('express');
const productsInfo = express.Router();

const catsProductsController = require('../controllers/productInfoController');

productsInfo.get('/:product', catsProductsController.getProduct);

module.exports = productsInfo;