const express = require('express')
const pg = require('../postgresql.js')

const router = express.Router()

// Route to save ratings to the database
router.post('/', async (req, res) => {
  const { user_hash, ratings } = req.body
  try {
    const user_id = await pg.insertUser(user_hash) // Get the user_id for this user_hash
    await pg.insertRatings(user_id, user_hash, ratings)
    res.send({ message: 'Ratings saved successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Error saving ratings' })
  }
})

module.exports = router