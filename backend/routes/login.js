// Import required modules
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const Joi = require('joi')
const { getUserFromDatabase } = require('../models/user.js')

// Initialize Express router
const router = express.Router()

// Define endpoint for user login
router.post('/', async (req, res) => {
  // Define schema for validating request data with Joi
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  })

  // Validate request data against schema
  const { error } = schema.validate(req.body)
  // If validation fails, return an error
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  try {
    // Fetch user from database using provided username
    const user = await getUserFromDatabase(req.body.username)

    // If user is not found, return an error
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    // Compare provided password with stored hash in database
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    // If passwords don't match, return an error
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password' })
    }

    // If passwords match, sign a new JWT using user id and secret key
    // Set JWT to expire in 2 hour
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    })

    // Set JWT as HttpOnly, secure, and SameSite cookie
    // Expires in 2 hours
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Only set to true if in production
      sameSite: 'strict', // Prevents CSRF attacks
      expires: new Date(Date.now() + 7200000), // 2 hours in milliseconds
    })

    // Return the JWT token in the response
    res.json({ token })
  } catch (err) {
    // Log any errors and send a 500 status code
    console.error(err)
    res.status(500).json({ error: 'An error occurred during authentication' })
  }
})

// Export the router to be used in other parts of the application
module.exports = router
