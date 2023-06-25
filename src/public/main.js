const ws = new WebSocket('ws://localhost:6013')

const connect = document.querySelector('[data-id="connect"]')
const callInLine = document.querySelector('[data-id="call_in_line"]')
const answerCall = document.querySelector('[data-id="answer_call"]')

ws.onmessage = ev => {
  console.log(JSON.parse(ev.data));
}

ws.onclose = ev => {
  console.log('socket ' + ev.wasClean);
}


connect.addEventListener('click', () => {
  send({
    control: 'connect'
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


function send(json) {
  ws.send(JSON.stringify(json))
}