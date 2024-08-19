const MESSAGES = {
  connect: [
    {
      event: "userInQueues",
      queues: "8994",
      ts: 1687645060
    },
    {
      condition: {
        lastCallAt: 1687644990,
        name: "free",
        paused: false,
        pausedReason: "",
        start: 0,
        unreachableAt: 0,
        updateTs: 0
      },
      event: "condition",
      ts: 1687645060
    },
  ],
  callInLine: [
    {
      "condition": {
        "lastCallAt": 1687644990,
        "name": "ring",
        "paused": false,
        "pausedReason": "",
        "start": 0,
        "unreachableAt": 0,
        "updateTs": 0
      },
      "event": "condition",
      "ts": 1687645306
    }
  ],
  answerCall:[
    {
      "condition": {
        "lastCallAt": 1687644990,
        "name": "talking",
        "paused": false,
        "pausedReason": "",
        "start": 0,
        "unreachableAt": 0,
        "updateTs": 0
      },
      "event": "condition",
      "ts": 1687645334
    },
    {
      "event": "openHelper",
      "olineVar1": "",
      "olineVar2": "",
      "olineVar3": "",
      "phone": "79608705840",
      "queue": "8994",
      "ts": 1687645334,
      "uid": "1688390546.247042_1688390546",
    },
    {
      "event": "callStarted",
      "phone": "79608705840",
      "text": "Вы приняли вызов",
      "ts": 1687645334
    },
    {
      "condition": {
        "lastCallAt": 1687644990,
        "name": "talking",
        "paused": false,
        "pausedReason": "",
        "start": 1687645337,
        "unreachableAt": 0,
        "updateTs": 0
      },
      "event": "condition",
      "ts": 1687645334
    },
  ],
  callEnded: [
    {
      "condition": {
        "lastCallAt": 1687645376,
        "name": "free",
        "paused": false,
        "pausedReason": "",
        "start": 1687645337,
        "unreachableAt": 0,
        "updateTs": 0
      },
      "event": "condition",
      "ts": 1687645375
    },
    {
      "event": "callEnded",
      "phone": "8994",
      "text": "Вызов завершён",
      "ts": 1687645375
    },
    {
      "condition": {
        "lastCallAt": 1687645376,
        "name": "free",
        "paused": false,
        "pausedReason": "",
        "start": 1687645337,
        "unreachableAt": 0,
        "updateTs": 0
      },
      "event": "condition",
      "ts": 1687645375
    }
  ],
  holdСall: [
    {
      "condition": {
        "lastCallAt": 1687645376,
        "name": "free",
        "paused": false,
        "pausedReason": "",
        "start": 1687645337,
        "unreachableAt": 0,
        "updateTs": 0,
        "holded": false,
        "holdedStart": null,
      },
      "event": "condition",
      "ts": 1687645375
    },
  ]
}

module.exports = (message, wss) => {
  let str = message.toString()
  let data = JSON.parse(str);
  
  if (data.control) {
    // Управление
    switch (data.control) {
      case 'connect':
        MESSAGES.connect.forEach(message => {
          if ('queues' in message) message.queues = data.queues
        })

        sendToAll(MESSAGES.connect)
        break;

      case 'call in line':
        sendToAll(MESSAGES.callInLine)
        break;

      case 'answer call':
        let payload = {
          olineVar1: data.olineVar1,
          olineVar2: data.olineVar2,
          olineVar3: data.olineVar3,
          phone: data.phone,
          queue: data.queue,
        }

        MESSAGES.answerCall.forEach(message => {
          for (let key of Object.keys(payload)) {
            if (key in message) {
              message[key] = payload[key]
            }
          }
        })

        sendToAll(MESSAGES.answerCall)
        break;

      case 'end call':
        MESSAGES.callEnded.forEach(message => {
          if ('phone' in message) message.phone = data.queue
        })

        sendToAll(MESSAGES.callEnded)
        break;

      case 'hold call':
        MESSAGES.holdСall.forEach(message => {
          // if ('phone' in message) message.phone = data.queue
          message.condition.holded = data.holded
          message.condition.holdedStart = Date.now()
          message.condition.name = data.holded ? 'pause' : 'talking'
        })

        sendToAll(MESSAGES.holdСall)
        break;
    }

  } else {
    // Прием/Отадача в фокус

  }


  function sendToAll(jsons) {
    jsons.forEach(json => {
      
      if (json.ts) {
        json.ts = Date.now().toString().slice(0, 10)
      }

      wss.clients.forEach(ws => {
        ws.send(JSON.stringify(json))
      })
    })
  }
}
