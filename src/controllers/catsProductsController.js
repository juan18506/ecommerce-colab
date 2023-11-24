const getProducts = (req, res) => {
  try {
    const productsJson = require(`../json/cats_products/${req.params.cat}`)
    res.json(productsJson);
  } catch (error) {
    res.status(500).json({ message: 'se rompio el servidor' });
  }
};

module.exports = {
  getProducts,
};
