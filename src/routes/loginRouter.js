const express = require('express');
const login = express.Router();

const loginController = require('../controllers/loginController');

login.post('/', loginController.authenticate);

module.exports = login;