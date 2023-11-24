const catsJson = require('../json/cats/cat.json');

const getCats = (req, res) => {
  res.json(catsJson);
};

module.exports = {
  getCats,
};
