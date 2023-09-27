const express = require('express')
const router = express.Router()
const { checkHashes } = require('../models/user')
const { validatePost } = require('../validation')
const { saveAnswer } = require('../models/saveAnswer')
const { getAllAnswers } = require('../models/getAllAnswers')

// Route to get all answers from the database
router.get('/answers', async (req, res) => {
  try {
    const answers = await getAllAnswers()
    res.status(200).json(answers)
  } catch (error) {
    if (error.message === 'Unauthorized')
      return res.status(401).send({ error: 'Unauthorized' })
    console.error(error) // Log the error to console
    res.status(500).json({ error: 'Error processing request' })
  }
})

// Route to check if a user hash exists in the database
router.get('/:hash', async (req, res) => {
  const hash = req.params.hash
  // Check if the hash string has a valid length and only contains alphanumeric characters
  if (/^[a-zA-Z0-9]{4,64}$/.test(hash)) {
    try {
      const result = await checkHashes([hash]) // Pass an array to checkHashes
      if (result.length > 0) {
        res.status(200).json({ message: 'Hash exists in the database.' })
      } else {
        res.status(404).json({ message: 'Hash does not exist.' })
      }
    } catch (error) {
      if (error.message === 'Unauthorized')
        return res.status(401).send({ error: 'Unauthorized' })
      console.error(error)
      res.status(500).json({ error: 'Error processing request' })
    }
  } else {
    res.status(400).json({ error: 'Invalid hash value' })
  }
})

// Route to update user data in the database
router.put('/:hash', async (req, res) => {
  const inputs = req.body
  const hash = req.params.hash
  if (/^[a-zA-Z0-9]+$/.test(hash)) {
    try {
      const validation = await validatePost(inputs)
      if (validation.isValid) {
        // Check the isValid property of the validation object
        const answer = await saveAnswer(inputs, hash)
        res.sendStatus(answer ? 200 : 404)
      } else {
        res.status(400).json({ error: validation.message }) // Return the error message from the validation object
      }
    } catch (error) {
      if (error.message === 'Unauthorized')
        return res.status(401).send({ error: 'Unauthorized' })
      console.error(error) // Log the error if one occurs
      res.status(500).json({ error: 'Error processing request' }) // Send a 500 status code and a JSON response with an error message
    }
  } else {
    res.status(400).json({ error: 'Invalid hash value' })
  }
})

module.exports = router
