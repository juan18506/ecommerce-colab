const cartBuy = require('../json/cart/buy.json')

const getCartBuy = (req, res) => {
  res.json(cartBuy);
};

module.exports = {
  getCartBuy,
};
