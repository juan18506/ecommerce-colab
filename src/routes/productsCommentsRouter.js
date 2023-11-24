const express = require('express');
const productsComments = express.Router();

const productsCommentsController = require('../controllers/productsCommentsController');

productsComments.get('/:comment', productsCommentsController.getComments);

module.exports = productsComments;