import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc Auth user & get token
//@route POST/api/users/login
//@access Public
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email }) // find email that match the email in json body

  if (user && (await user.matchPassword(password))) {
    // if user exists and auth password -- method added in model
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401) // 401 is unauthorized if pw don't match
    throw new Error('Invalid email or password')
  }
})

//@desc Register a new user
//@route POST/api/users
//@access Public
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email: email }) // find email that match the email in json body

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc Get user profile
//@route GET/api/users/profile
//@access Private
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Update user profile
//@route PUT/api/users/profile
//@access Private
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password // encrypted automatically because of what we added in model
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Get all users
//@route PUT/api/users
//@access Private/Admin
const getUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//@desc Delete a user
//@route DELETE/api/users/:id
//@access Private/Admin
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.deleteOne()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Get user by id
//@route PUT/api/userd/:id
//@access Private/Admin
const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Update user info for admin
//@route PUT/api/users/:id
//@access Private/Admin
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
