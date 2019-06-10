const express = require('express')
const path = require('path')

const app = express()

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'host.html')
})

app.get('/l/:base64String', (req, res) => {
  const base64Regex = /(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)/
  const base64String = req.params.base64String
  if (base64Regex.test(base64String)) {
    return res.sendFile(path.join(__dirname, 'public', 'guest.html')
  }
  res.status(404).send('Not Found')
})

app.listen(process.env.PORT || 3001)
