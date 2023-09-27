const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')
const fs = require('fs')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// Load environment variables
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN
const SKILLS_ENDPOINT = process.env.SKILLS_ENDPOINT

// Define middleware function
const middleware = function (app) {
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN }))
  app.use(express.static(path.join(__dirname, 'dist')))
  app.use(express.json())
  app.use(helmet())

  // Rate limiter
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })

  app.use(limiter)
  app.use(cookieParser())

  // Logger
  app.use(morgan('combined'))
  let logDirectory = path.join(__dirname, 'log')
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
  let accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
  })
  app.use(morgan('combined', { stream: accessLogStream }))
}

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.status(401).send('Access Denied')

  try {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' })
      }
      req.user = decoded
      next()
    })
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = { FRONTEND_ORIGIN, SKILLS_ENDPOINT, middleware, auth }
