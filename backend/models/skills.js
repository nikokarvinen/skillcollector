const axios = require('axios')
const { query } = require('../postgresql.js')

// Function to fetch skills from an external API and store them in the PostgreSQL database
const fetchAndStoreSkills = async (url) => {
  try {
    const response = await axios.get(url)
    const skills = response.data
    await insertSkills(skills)
    return skills
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to insert skills into the PostgreSQL database
const insertSkills = async (skills) => {
  for (let skill of skills) {
    await query(
      'INSERT INTO skills (id, title, category, subcategory, gen_description) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET title = $2, category = $3, subcategory = $4, gen_description = $5',
      [
        skill.id,
        skill.title,
        skill.category,
        skill.subcategory,
        skill.gen_description,
      ]
    )
  }
}

// Function to fetch a skill's title and category from the PostgreSQL database
const fetchSkillData = async (skill_id) => {
  const { rows } = await query(
    'SELECT title, category FROM skills WHERE id = $1',
    [skill_id]
  )
  return rows[0] || { title: '', category: '' }
}

module.exports = {
  fetchAndStoreSkills,
  insertSkills,
  fetchSkillData,
}
