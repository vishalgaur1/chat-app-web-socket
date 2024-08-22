const io = require('socket.io')(3000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});
const users = {};

io.on('connection', socket => {

    socket.on('new-user', name1 => {
        users[socket.id] = name1;
        socket.broadcast.emit('user-connected', name1);
    });

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name1:users[socket.id]});
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    });
});
