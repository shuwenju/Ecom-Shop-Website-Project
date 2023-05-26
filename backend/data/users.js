import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin user',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Shushu',
    email: 'shu@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Aubree',
    email: 'aubree@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]
export default users
