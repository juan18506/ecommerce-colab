
const getPublish = (req, res) => {
  try {
    const publishJson = require(`../json/sell/${req.params.file}`);
    res.json(publishJson);
  } catch (error) {
    res.status(500).json({ message: 'se rompio el servidor' });
  }
};

module.exports = {
  getPublish,
};
