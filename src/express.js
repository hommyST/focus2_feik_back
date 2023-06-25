const express = require('express')
const app = express()

app.use(express.static('src/public'))

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(process.env.SERVER_PORT)


console.log('Сервер запущен на: ' + process.env.SERVER_PORT + ' порту');
