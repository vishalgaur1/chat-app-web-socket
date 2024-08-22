const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name1 = prompt('What is your name?');
socket.emit('new-user', name1);

socket.on('chat-message', data => {
    appendMessage(`${data.name1}: ${data.message}`, 'other');
});

socket.on('user-connected', name1 => {
    appendMessage(`${name1} connected`, 'system');
});

socket.on('user-disconnected', name1 => {
    appendMessage(`${name1} disconnected`, 'system');
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`, 'user');
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message, type = 'other') {
    const messageElement = document.createElement('div');
    if (type === 'system') {
        messageElement.classList.add('system-message');
    } else if (type === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('other-message');
    }
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
