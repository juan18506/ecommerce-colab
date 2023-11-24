const cartModel = require('../models/cartModel');
const cartBuy = require('../json/cart/buy.json');

const getCart = async (req, res) => {
  const cart = await cartModel.getCart();
  res.json(cart);
};

const createProduct = async (req, res) => {
  const createdProcuct = await cartModel.createProduct(req.body);

  if (createdProcuct) {
    res.json(createdProcuct);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }

};

const updateProductCount = async (req, res) => {
  const id = Number(req.params.id);
  const product = await cartModel.getProductById(id);

  if (product) {
    const updatedProduct = await cartModel.updateProductCount(id, {
      ...product,
      ...req.body,
    });

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

const deleteCartProduct = async (req, res) => {
  const id = Number(req.params.id);
  const product = await cartModel.getProductById(id);

  if (product) {
    const result = await cartModel.deleteCartProduct(id);

    if (result) {
      res.json(product);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }

};

const getCartBuy = (req, res) => {
  res.json(cartBuy);
};

module.exports = {
  getCart,
  createProduct,
  updateProductCount,
  deleteCartProduct,
  getCartBuy,
};
