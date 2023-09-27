const { insertUser } = require('../models/user')
const { fetchSkillData } = require('../models/skills')
const { query } = require('../postgresql.js')

// Function to save answers into the database
const saveAnswer = async (inputs, user_hash) => {
  try {
    const user_id = await insertUser(user_hash) // Get the user_id for this user_hash
    // Map inputs to an array of promises
    const ratingsPromises = Object.entries(inputs).map(
      async ([skill_id, rating]) => {
        const { title, category } = await fetchSkillData(skill_id)
        const is_sfia = category !== 'Soft skills'

        const date = new Date()
        const offset = -date.getTimezoneOffset()
        const sign = offset < 0 ? '-' : '+'
        const absOffset = Math.abs(offset)
        const hoursOffset = String(Math.floor(absOffset / 60)).padStart(2, '0')
        const minutesOffset = String(absOffset % 60).padStart(2, '0')

        const formattedDatetime = `${date.getUTCFullYear()}-${String(
          date.getUTCMonth() + 1
        ).padStart(2, '0')}-${String(date.getUTCDate()).padStart(
          2,
          '0'
        )} ${String(date.getUTCHours()).padStart(2, '0')}:${String(
          date.getUTCMinutes()
        ).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(
          2,
          '0'
        )}${sign}${hoursOffset}:${minutesOffset}`

        // Execute query and return a promise
        return query(
          'INSERT INTO ratings (user_id, user_hash, skill_id, title, rating, is_sfia, datetime) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (user_hash, skill_id) DO UPDATE SET rating = $5, title = $4, is_sfia = $6, datetime = $7',
          [
            user_id,
            user_hash,
            skill_id,
            title,
            rating,
            is_sfia,
            formattedDatetime,
          ]
        )
      }
    )

    // Wait for all queries to complete
    await Promise.all(ratingsPromises)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = { saveAnswer }
