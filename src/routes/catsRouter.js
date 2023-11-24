const express = require('express');
const cats = express.Router();

const catsController = require('../controllers/catsController');

cats.get('/', catsController.getCats);

module.exports = cats;