const { query, pool } = require('../postgresql.js')

// Function to check if user hashes exist in the PostgreSQL database
const checkHashes = async (hashes) => {
  try {
    const queryText = `
      SELECT user_hash
      FROM users 
      WHERE user_hash = ANY ($1)
    `
    const { rows } = await query(queryText, [hashes])
    return rows.map((row) => row.user_hash)
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to fetch a user by id from the PostgreSQL database
const fetchUser = async (id) => {
  try {
    const { rows } = await query('SELECT * FROM users WHERE user_id = $1', [id])
    return rows[0]
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to fetch all users from the PostgreSQL database
const fetchAllUsers = async () => {
  const { rows } = await query('SELECT * FROM users')
  return rows
}

// Function to insert multiple new users into the PostgreSQL database
const insertUsers = async (user_hashes) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const userIds = []
    for (const hash of user_hashes) {
      if (typeof hash !== 'string' || !hash.trim()) {
        throw new Error('User hash must be a non-empty string.')
      }

      const res = await client.query(
        'INSERT INTO users (user_hash) VALUES ($1) ON CONFLICT (user_hash) DO NOTHING RETURNING user_id',
        [hash]
      )

      const userId = res.rows[0]?.user_id
      if (userId) {
        userIds.push(userId)
      }
    }

    await client.query('COMMIT')

    return userIds // Return IDs of inserted users
  } catch (error) {
    await client.query('ROLLBACK')
    throw error // Throw error to be handled in the route
  } finally {
    client.release()
  }
}

// Function to insert a new user into the PostgreSQL database
const insertUser = async (user_hash) => {
  if (!user_hash.trim()) {
    throw new Error('User hash cannot be empty or whitespace.')
  }

  await query(
    'INSERT INTO users (user_hash) VALUES ($1) ON CONFLICT (user_hash) DO NOTHING',
    [user_hash]
  )

  return getUserId(user_hash) // Get and return the user's ID
}

// Function to fetch a user's ID from the PostgreSQL database
const getUserId = async (user_hash) => {
  const { rows } = await query(
    'SELECT user_id FROM users WHERE user_hash = $1',
    [user_hash]
  )
  return rows[0]?.user_id
}

// Function to delete a user from the PostgreSQL database
const deleteUser = async (id) => {
  // First check if the user exists
  const user = await fetchUser(id)
  if (!user) {
    throw new Error(`User with ID ${id} does not exist`)
  }

  const { rowCount } = await query('DELETE FROM users WHERE user_id = $1', [id])
  return rowCount
}

// Function to insert a new user into the PostgreSQL database
const createUserInDatabase = async (username, hashedPassword) => {
  try {
    // Check if username and password are strings
    if (typeof username !== 'string' || typeof hashedPassword !== 'string') {
      throw new Error('Username and password must be strings.')
    }

    // Trim and check if username and password are not empty
    if (!username.trim() || !hashedPassword.trim()) {
      throw new Error('Username and password cannot be empty or whitespace.')
    }

    const existingUser = await getUserFromDatabase(username)
    if (existingUser) {
      throw new Error('Username already exists')
    }

    const { rows } = await query(
      'INSERT INTO users_credentials (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    )

    // rows[0].id will be the id of the newly created user
    return rows[0].id
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to fetch a user by username from the PostgreSQL database
const getUserFromDatabase = async (username) => {
  try {
    const { rows } = await query(
      'SELECT * FROM users_credentials WHERE username = $1',
      [username]
    )

    if (rows.length === 0) {
      return null
    }

    return rows[0] // returns the first user found or null if no user was found
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  insertUser,
  checkHashes,
  insertUsers,
  getUserId,
  fetchUser,
  fetchAllUsers,
  deleteUser,
  createUserInDatabase,
  getUserFromDatabase,
}
