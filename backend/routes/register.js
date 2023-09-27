const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const {
  createUserInDatabase,
  getUserFromDatabase,
} = require('../models/user.js')

const router = express.Router()

router.post('/', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  const { username, password } = req.body

  try {
    // Check if a user with the given username already exists
    const existingUser = await getUserFromDatabase(username)
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user in the database
    const userId = await createUserInDatabase(username, hashedPassword)

    // Sign a JWT for the new user
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    })

    // Set JWT as HttpOnly, secure, and SameSite cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Only set to true if in production
      sameSite: 'strict', // Prevents CSRF attacks
      expires: new Date(Date.now() + 900000),
    })

    res
      .status(201)
      .json({ message: 'User created successfully', userId: userId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error registering user' })
  }
})

module.exports = router
