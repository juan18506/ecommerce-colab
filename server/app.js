const express = require('express');

const app = express();
const port = 3000;

const userCart = require('./routes/userCartRouter');

app.use(express.json());

app.use('/api/user_cart', userCart);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
