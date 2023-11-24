const express = require('express');

const app = express();
const port = 3000;

const userCartRouter = require('./routes/userCartRouter');
const catsRouter = require('./routes/catsRouter');

app.use(express.json());

app.use(express.static('src/public'));

app.use('/api/user_cart', userCartRouter);
app.use('/api/cats', catsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
