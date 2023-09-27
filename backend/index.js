// Dependencies
const express = require('express')
require('dotenv').config()

const userRoutes = require('./routes/user')
const ratingsRoutes = require('./routes/ratings')
const skillsRoutes = require('./routes/skills')
const answerRoutes = require('./routes/data')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')

const app = express()

// Apply middleware
require('./middleware').middleware(app)

// Routes
app.use('/api/users', userRoutes)
app.use('/api/ratings', ratingsRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api', answerRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/register', registerRoutes)

// Import server start function and start the server
const startServer = require('./server.js')
startServer(app)
