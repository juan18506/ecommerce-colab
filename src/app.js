const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const SECRET_KEY = 'contraseña';

const loginRouter = require('./routes/loginRouter');
const catsRouter = require('./routes/catsRouter');
const sellRouter = require('./routes/sellRouter');
const catsProductsRouter = require('./routes/catsProductsRouter');
const productInfoRouter = require('./routes/productInfoRouter');
const productsCommentsRouter = require('./routes/productsCommentsRouter');
const cartRouter = require('./routes/cartRouter');

app.use(express.json());
app.use(express.static('src/public'));

app.use('/login', loginRouter);
app.use('/api/cats', catsRouter);
app.use('/api/sell', sellRouter);
app.use('/api/cats_products', catsProductsRouter);
app.use('/api/products', productInfoRouter);
app.use('/api/products_comments', productsCommentsRouter);
app.use('/api/cart', (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers['access-token'], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Usuario no autorizado' });
  }
});
app.use('/api/cart', cartRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
