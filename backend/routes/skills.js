// routes/skills.js
const express = require('express')
const router = express.Router()
const { fetchAndStoreSkills } = require('../models/skills')

// Route to get skills from the skills database
router.get('/', async (req, res) => {
  try {
    const skills = await fetchAndStoreSkills(process.env.SKILLS_ENDPOINT)
    res.status(200).json(skills)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' })
  }
})

module.exports = router
