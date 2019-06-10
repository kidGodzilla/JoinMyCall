const http = require('http')
const express = require('express')

const app = express()

const server = http.createServer(app)

app.use('/public/guest.js', express.static(__dirname + '/public/guest.js'))
app.use('/public/host.js', express.static(__dirname + '/public/host.js'))
app.use('/public/main.css', express.static(__dirname + '/public/main.css'))
app.use('/public/logo.svg', express.static(__dirname + '/public/logo.svg'))

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/host.html')
})

server.listen(process.env.PORT || 3001)