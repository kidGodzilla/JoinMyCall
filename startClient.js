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

app.get('/l/:base64String', (req, res, next) => {
  const base64Regex = /(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)/
  const base64String = req.params.base64String
  base64Regex.test(base64String) ? res.sendFile(__dirname + '/public/guest.html') : res.sendStatus(404)
})

server.listen(process.env.PORT || 3001)