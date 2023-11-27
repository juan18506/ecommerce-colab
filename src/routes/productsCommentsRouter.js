const express = require('express');
const productsComments = express.Router();

const productsCommentsController = require('../controllers/productsCommentsController');

productsComments.get('/:comment', productsCommentsController.getComments);
productsComments.post('/:comment', productsCommentsController.createComment);

module.exports = productsComments;