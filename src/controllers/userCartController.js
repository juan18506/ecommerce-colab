const userCartJson = require('../json/user_cart/25801.json');

const getCart = (req, res) => {
  res.json(userCartJson);
};

// const getUserById = (req, res) => {
//   const user = userModel.getUserById(req.params.id);

//   if (!user) {
//     res.status(404).json({ message: 'Usuario no encontrado' });
//     return;
//   }

//   res.status(200).json(user);
// };

// const createUser = (req, res) => {
//   const createdUser = userModel.createUser(req.body);

//   if (!createdUser) {
//     res.status(500).json({ message: 'Ha ocurrido un error' });
//     return;
//   }
  
//   res.status(200).json(createdUser);
// };

// const updateUser = (req, res) => {
//   const updatedUser = userModel.updateUser(req.params.id, req.body);

//   if (!updatedUser) {
//     res.status(404).json({ message: 'Usuario no encontrado' });
//     return;
//   }
  
//   res.status(200).json(updatedUser);
// };

// const deleteUser = (req, res) => {
//   const deletedUser = userModel.deleteUser(req.params.id);

//   if (!deletedUser) {
//     res.status(404).json({ message: 'Usuario no encontrado' });
//     return;
//   }

//   res.status(200).json(deletedUser);
// };

module.exports = {
  getCart,
  // getUserById,
  // updateUser,
  // createUser,
  // deleteUser,
};
