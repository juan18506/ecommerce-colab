const getComments = (req, res) => {
  try {
    const commentJson = require(`../json/products_comments/${req.params.comment}`)
    res.json(commentJson);
  } catch (error) {
    res.status(500).json({ message: 'se rompio el servidor' });
  }
};

module.exports = {
  getComments,
};