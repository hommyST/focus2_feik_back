const handler = require('./handler.js')
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: process.env.WS_PORT });

console.log(
  '\x1b[33m'
  + 'Сокет доступен на: '
  + process.env.WS_PORT
  + ' порту'
  + '\x1b[0m'
)


wsServer.on('connection', onConnect);

function onConnect(wsClient, req) {
  const ip1 = req.socket?.remoteAddress?.replace(/:|[a-z]/g, '')
  const ip2 = req.headers['x-forwarded-for']?.split(',')?.[0]?.trim()
  
  console.log(
    '\x1b[32mПользователь подключился: '
    + '\x1b[0m'
    + (ip2 || ip1)
    + ' \x1b[0m'
  )

  wsClient.on('message', (message) => {
    handler(message, wsServer)
  })

  wsClient.on('close', () => {
    console.log(
      '\x1b[31mПользователь отключился: '
      + '\x1b[0m'
      + (ip2 || ip1)
      + ' \x1b[0m'
    )
  })
}