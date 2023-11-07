const express = require('express')
const app = express()

app.use(express.static('src/public'))

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(process.env.SERVER_PORT)


console.log(
  '\x1b[33m'
  + 'Сервер запущен на: ' 
  + process.env.SERVER_PORT 
  + ' порту'
  + '\x1b[0m'
)
console.log(
  '\x1b[35m'
  + 'http://localhost:'
  + process.env.SERVER_PORT
  + '\x1b[0m'
)
