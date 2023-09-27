const { query } = require('../postgresql.js')

// Function to get all answers from the database
const getAllAnswers = async () => {
  try {
    const { rows } = await query('SELECT * FROM ratings')
    return rows
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = { getAllAnswers }
