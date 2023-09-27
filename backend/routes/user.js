const express = require('express')
const userModel = require('../models/user.js')
const { auth } = require('../middleware')

const router = express.Router()

// Route to get all users from the database
router.get('/', auth, async (req, res) => {
  try {
    const users = await userModel.fetchAllUsers()
    res.status(200).json(users)
  } catch (error) {
    if (error.message === 'Unauthorized')
      return res.status(401).send({ error: 'Unauthorized' })
    console.error(`Error fetching users: ${error.message}`)
    res.status(500).json({ error: 'Error fetching users from database' })
  }
})

// Route to get a specific user from the database
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'User ID must be a valid number.' })
  }
  try {
    const user = await userModel.fetchUser(id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: `User not found with ID: ${id}` })
    }
  } catch (error) {
    if (error.message === 'Unauthorized')
      return res.status(401).send({ error: 'Unauthorized' })
    console.error(`Error fetching user with ID ${id}: ${error.message}`)
    res.status(500).json({ error: 'Error fetching user from database' })
  }
})

// Route to add a new user or multiple users to the database
router.post('/', auth, async (req, res) => {
  let users = req.body

  // Adjust single user to array of users for consistent processing
  if (!Array.isArray(users)) {
    users = [users]
  }

  // Validate the user object(s)
  for (let user of users) {
    if (!user.hash) {
      return res.status(400).json({ error: 'User object must include a hash.' })
    }
  }

  const hashes = users.map((user) => user.hash)
  let existingHashes

  try {
    existingHashes = await userModel.checkHashes(hashes)
  } catch (error) {
    console.error(`Error checking user hashes: ${error.message}`)
    return res.status(500).json({ error: 'Error checking user hashes' })
  }

  const newUsersHashes = hashes.filter((hash) => !existingHashes.includes(hash))

  if (newUsersHashes.length === 0) {
    return res.status(409).json({ error: 'All users already exist' })
  }

  let result
  try {
    result = await userModel.insertUsers(newUsersHashes)
  } catch (error) {
    console.error(`Error adding users: ${error.message}`)
    return res.status(500).json({ error: 'Error adding users to database' })
  }

  if (result.length === 1) {
    res.status(201).json({ userId: result[0] })
  } else {
    res.status(201).json({ userIds: result })
  }
})

// Route to delete a user from the database
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'User ID must be a valid number.' })
  }
  try {
    const result = await userModel.deleteUser(id)
    if (result > 0) {
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(404).json({
        message: `User not found or could not be deleted with ID: ${id}`,
      })
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${id}: ${error.message}`)
    res.status(500).json({ error: 'Error deleting user from database' })
  }
})

module.exports = router
