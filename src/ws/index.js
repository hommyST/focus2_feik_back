const handler = require('./handler.js')
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: process.env.WS_PORT });

console.log('Сокет доступен на: ' + process.env.WS_PORT + ' порту');


wsServer.on('connection', onConnect);

function onConnect(wsClient) {
  console.log('Новый пользователь');

  wsClient.on('message', (message) => {
    handler(message, wsServer)
  })

  wsClient.on('close', () => {
    console.log('Пользователь отключился');
  })
}