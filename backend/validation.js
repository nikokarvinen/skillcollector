// Import fetchSoftSkills and validator
const { fetchSoftSkills } = require('./postgresql')
const validator = require('validator')

// Function to validate a post
const validatePost = async (inputs) => {
  let sfiaCount = 0
  let softCount = 0
  let skillTypes = {}

  // Fetch the set of soft skills
  const softSkillSet = new Set(await fetchSoftSkills())

  // Iterate through the inputs
  for (let [skillId, rating] of Object.entries(inputs)) {
    // sanitize skillId
    skillId = validator.escape(skillId)

    // Check if the rating is a valid integer between 1 and 5
    if (!(Number.isInteger(rating) && rating >= 1 && rating <= 5)) {
      return { isValid: false, message: 'Invalid rating.' }
    }

    // Check if the skill is a soft skill or SFIA skill
    if (softSkillSet.has(skillId)) {
      softCount += 1
      skillTypes[skillId] = false // Soft skill
    } else {
      sfiaCount += 1
      skillTypes[skillId] = true // SFIA skill
    }
  }

  // Check the counts of SFIA and soft skills
  if (sfiaCount !== 20 || softCount !== 3) {
    return { isValid: false, message: 'Invalid count of SFIA or soft skills.' }
  }

  // Return the counts and skill types
  return {
    isValid: true,
    sfiaCount: sfiaCount,
    softCount: softCount,
    skillTypes: skillTypes,
  }
}

module.exports = { validatePost }
