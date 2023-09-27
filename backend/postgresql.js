// Import required module
const { Pool } = require('pg')

// Initialize PostgreSQL client using environment variables
const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
})

// Function to fetch soft skills from the PostgreSQL database
const fetchSoftSkills = async () => {
  const { rows } = await query('SELECT id FROM skills WHERE category = $1', [
    'Soft skills',
  ])
  return rows.map((row) => row.id)
}

// Function to execute a query on the PostgreSQL database
const query = (text, params) => pool.query(text, params)

module.exports = {
  query,
  fetchSoftSkills,
  pool,
}
