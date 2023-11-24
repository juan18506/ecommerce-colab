const getProduct = (req, res) => {
  try {
    const productJson = require(`../json/products/${req.params.product}`)
    res.json(productJson);
  } catch (error) {
    res.status(500).json({ message: 'se rompio el servidor' });
  }
};

module.exports = {
  getProduct,
};