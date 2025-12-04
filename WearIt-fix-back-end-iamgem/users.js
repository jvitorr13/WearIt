const bcrypt = require('bcryptjs');

const users = [
  {
    id: '1',
    name: 'João Vitor',
    email: 'joao@teste.com',
    password: bcrypt.hashSync('123456', 8)
  },
];

module.exports = users;
