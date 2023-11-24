const express = require('express');

const app = express();
const port = 3000;

const userCartRouter = require('./routes/userCartRouter');
const catsRouter = require('./routes/catsRouter');
const sellRouter = require('./routes/sellRouter');
const catsProductsRouter = require('./routes/catsProductsRouter');
const productInfoRouter = require('./routes/productInfoRouter');
const productsCommentsRouter = require('./routes/productsCommentsRouter');
const cartRouter = require('./routes/cartRouter');

app.use(express.json());

app.use(express.static('src/public'));

app.use('/api/user_cart', userCartRouter);
app.use('/api/cats', catsRouter);
app.use('/api/sell', sellRouter);
app.use('/api/cats_products', catsProductsRouter);
app.use('/api/products', productInfoRouter);
app.use('/api/products_comments', productsCommentsRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
