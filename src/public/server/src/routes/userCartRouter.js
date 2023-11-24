/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require('express');
const userCart = express.Router();

const userCartController = require('../controllers/userCartController');

userCart.get('/', userCartController.getUsers);
// userCart.get('/:id', userCartController.getUserById);
// userCart.post('/', userCartController.createUser);
// userCart.put('/:id', userCartController.updateUser);
// userCart.delete('/:id', userCartController.deleteUser);

module.exports = userCart;
