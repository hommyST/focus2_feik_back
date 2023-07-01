const ws = new WebSocket('ws://localhost:6013')

const connect = document.querySelector('[data-id="connect"]')
const callInLine = document.querySelector('[data-id="call_in_line"]')
const answerCall = document.querySelector('[data-id="answer_call"]')
const endCall = document.querySelector('[data-id="end_call"]')

ws.onmessage = ev => {
  console.log(JSON.parse(ev.data));
}

ws.onclose = ev => {
  console.log('socket ' + ev.wasClean);
}


connect.addEventListener('click', () => {
  const queues = document.querySelector('#connect_queues').value

  send({
    control: 'connect',
    queues
  })
})

callInLine.addEventListener('click', () => {
  send({
    control: 'call in line'
  })
})

answerCall.addEventListener('click', () => {
  const olineVar1 = document.querySelector('#answer_olineVar1').value
  const olineVar2 = document.querySelector('#answer_olineVar2').value
  const olineVar3 = document.querySelector('#answer_olineVar3').value
  const phone = document.querySelector('#answer_phone').value
  const queue = document.querySelector('#answer_queue').value

  send({
    control: 'answer call',
    olineVar1,
    olineVar2,
    olineVar3,
    phone,
    queue,
  })
})

endCall.addEventListener('click', () => {
  const queue = document.querySelector('#end_queue').value

  send({
    control: 'end call',
    queue
  })
})


function send(json) {
  ws.send(JSON.stringify(json))
}