/*
En este archivo se trabaja la persistencia y consulta de datos 
con la base de datos. 
Por simplicidad, se opta por trabajar en un archivo JSON usando el módulo FileSystem,
pero se podría utilizar MariaDB
*/

// const fs = require('fs');
// const path = require('path');

// const filePath = path.join(__dirname, '../json/users.json');

// const data = fs.readFileSync(filePath, 'utf-8');
// const users = JSON.parse(data);

// const getUsers = () => {
//   return users;
// };

// const getNextId = () => {
//   let nextId = 0;

//   users.forEach(user => {
//     if (user.id > nextId) nextId = user.id;
//   });

//   return nextId + 1;
// };


// const getUserById = (id) => {
//   return users.find(user => user.id === Number(id));
// };

// const updateUser = (id, updatedUser) => {
//   const index = users.findIndex((user) => user.id === Number(id));

//   if (index !== -1) {
//     users[index] = { ...users[index], ...updatedUser };

//     fs.writeFileSync(filePath, JSON.stringify(users), 'utf-8');
//     return users[index];
//   }

//   return false;
// };

// const createUser = (newUser) => {
//   newUser.id = getNextId();
//   users.push(newUser);
  
//   fs.writeFileSync(filePath, JSON.stringify(users), 'utf-8');
//   return newUser;
// };

// const deleteUser = (id) => {
//   const index = users.findIndex((user) => user.id === Number(id));

//   if (index !== -1) return users.splice(index, 1)[0];

//   return false;
// };

// module.exports = {
//   getUsers,
//   getUserById,
//   updateUser,
//   createUser,
//   deleteUser,
// };
