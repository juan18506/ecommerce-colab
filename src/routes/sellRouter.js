const express = require('express');
const sell = express.Router();

const sellController = require('../controllers/sellController');

sell.get('/:file', sellController.getPublish);

module.exports = sell;