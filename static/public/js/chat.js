let socket = io();

let messages = document.querySelector('#messages');
let form = document.querySelector('#form');
let input = document.querySelector('#input');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value) {
    let data = {
      sender_id: senderId,
      reciever_id: recieverId,
      content: input.value,
      date: new Date()
    };
    socket.emit('message-sent', data);
    input.value = '';
  }
});

socket.on('message-sent', data => {
  let message = document.createElement('li');
  if (data.sender_id == senderId) {
    message.classList.add('sent-message');
  } else {
    message.classList.add('recieved-message');
  }

  message.innerHTML = `
    <span>${getDateString(new Date(data.date))}</span>
    <p>${data.content}</p>
  `;

  messages.appendChild(message);
  window.scrollTo(0, document.body.scrollHeight);
});

function getDateString(date) {
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();
  let minutes = date.getMinutes().toString();
  if (minutes.length == 1) {
    minutes = '0' + minutes;
  }
  let hours = date.getHours().toString();
  if (hours.length == 1) {
    hours = '0' + hours;
  }
  return `${month} ${day}, ${hours}:${minutes}`;
}
