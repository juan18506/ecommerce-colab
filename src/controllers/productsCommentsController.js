const fs = require('fs');
const path = require('path');

const getComments = (req, res) => {
  try {
    const commentJson = require(`../json/products_comments/${req.params.comment}`)
    res.json(commentJson);
  } catch (error) {
    res.status(500).json({ message: 'se rompio el servidor' });
  }
};

const createComment = (req, res) => {
  try {
    const filePath = path.join(__dirname, `../json/products_comments/${req.params.comment}`);
    const data = fs.readFileSync(filePath, 'utf-8');
    const comments = JSON.parse(data);

    comments.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(comments), 'utf-8');

    res.json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'se rompio el servidor' });
  }
};

module.exports = {
  getComments,
  createComment,
};