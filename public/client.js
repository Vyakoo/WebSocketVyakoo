let form = document.querySelector(`#form`);
let input = document.querySelector(`#input`)
let statusUser = document.querySelector(`#statusUser`);
let message = document.querySelector(`#message`);

const ws = new WebSocket(`ws://localhost:3000`);

function setStatusUser(value) {
  statusUser.innerHTML = value;
}

function addMessage(value) {
  const li = document.createElement('li');

  li.innerHTML = value;
  message.appendChild(li);
}


ws.onopen = () => setStatusUser('ONLINE');
ws.onmessage = response => addMessage(response.data);
ws.onclose = () => setStatusUser('OFFLINE');

form.addEventListener('submit', evt => {
  evt.preventDefault();

  ws.send(input.value);
  input.value = '';
});