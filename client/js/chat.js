const chatForm = document.getElementById('chat-form');
const disconnect = document.getElementById('disconnect');
const chatMessages = document.querySelector('.chat-messages');

// Get username from URL
let {username, inviter} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(window.location.origin)
const socket = io(window.location.origin, {query: {id: username, roomId: inviter}});

// Typing...
let typing = false;
let timeout = undefined;

if (username == undefined) {
    username = 'Support representative';
}

// Client joined the chat
socket.emit('joinChat', {username});

socket.on('connection', async (socket) => {
    socket.data.user = username
    console.log('11111')
});

// Message from server
socket.on('message', message => {
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Leave chat button
disconnect.addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('close', {user: username, text: "has diconnected..."});
});

socket.on('redirect', dest =>{
    window.location.replace(dest);
})

// Send button
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the message text.
    const msg = e.target.elements.msg.value;

    // Emit the message to the server.
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
    clearTimeout(timeout);
    typingTimeout();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<h4>${message.username}, ${message.time}</h4>
            <p class="text">${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Hide 'typing..'
function typingTimeout() {
    typing = false;
    socket.emit('typing', {user: username, typing: false});
}

// Show 'typing..'
$(document).ready(function () {
    $('#msg').keypress((e) => {
        // if Not CR
        if (e.which != 13) {
            typing = true;
            socket.emit('typing', {user: username, typing: true});
            clearTimeout(timeout);
            timeout = setTimeout(typingTimeout, 3000);
        } else {
            clearTimeout(timeout);
            typingTimeout();
        }
    });

    socket.on('display', (data) => {
        if (data.typing == true) {
            let typing = document.getElementById('typing-div');
            typing.innerHTML = `<p>${data.user} is typing...</p>`;
            typing.style.display = 'block';
        } else {
            let typing = document.getElementById('typing-div');
            typing.style.display = 'none';
        }
    })
})
