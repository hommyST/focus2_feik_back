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
      "ts": 1687645334
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
}

module.exports = (message, wss) => {
  let str = message.toString()
  let data = JSON.parse(str);
  
  if (data.control) {
    // Управление
    switch (data.control) {
      case 'connect':
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

        MESSAGES.answerCall.forEach(data => {
          for (let key of Object.keys(payload)) {
            if (key in data) {
              data[key] = payload[key]
            }
          }
        })

        sendToAll(MESSAGES.answerCall)
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
