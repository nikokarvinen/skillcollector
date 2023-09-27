const http = require('http')
const https = require('https')
const fs = require('fs')

// Function to start the server
const startServer = (app, skillsUrl) => {
  const httpPort = process.env.HTTP_PORT
  const httpsPort = process.env.HTTPS_PORT

  // Check if running in production environment
  if (process.env.ENVPROD === 'true') {
    // Read SSL certificate files
    const privateKey = fs.readFileSync(
      `/etc/letsencrypt/live/${process.env.HOSTNAME}/privkey.pem`,
      'utf8'
    )
    const certificate = fs.readFileSync(
      `/etc/letsencrypt/live/${process.env.HOSTNAME}/cert.pem`,
      'utf8'
    )
    const ca = fs.readFileSync(
      `/etc/letsencrypt/live/${process.env.HOSTNAME}/chain.pem`,
      'utf8'
    )

    // Create credentials object for HTTPS server
    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    }

    // Create and start HTTPS server
    const httpsServer = https.createServer(credentials, app)
    httpsServer
      .listen(httpsPort, () => {
        console.log(`HTTPS Server running on port ${httpsPort}`)
      })
      .on('error', (err) => {
        console.error(`HTTPS Server failed to start - ${err.message}`)
      })
  } else {
    // Create and start HTTP server
    const httpServer = http.createServer(app)
    httpServer
      .listen(httpPort, () => {
        console.log(`HTTP Server running on port ${httpPort}`)
      })
      .on('error', (err) => {
        console.error(`HTTP Server failed to start - ${err.message}`)
      })
  }
}

process.on('unhandledRejection', (error, promise) => {
  console.error(`Unhandled promise rejection: ${error}\n`, promise)
})

module.exports = startServer
