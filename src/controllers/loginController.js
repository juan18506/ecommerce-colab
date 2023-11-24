const jwt = require('jsonwebtoken');
const SECRET_KEY = 'contraseña';

const authenticate = (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Usuario y/o contraseña incorrecto' });
  }
};

module.exports = {
  authenticate,
};