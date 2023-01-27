require('dotenv').config({path: '.env'});
const express = require("express");
const bodyParser = require('body-parser');
const totalSession = require('./server/routers/sessionRoute');
const connectedRoute = require('./server/routers/connectedRoute');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');

const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const port = process.env.PORT || 4020;
const app = express();

// cookie parser middleware
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_KEY],
    domain: 'localhost',
    maxAge: 86400000
}));


app.use(express.static('./public'));

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))


app.use('/', totalSession.sessionRouter);
app.use('/connected', connectedRoute.connectedRouter);
//load files
app.use('/client/css', express.static(__dirname + '/client/css'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

const server = app.listen(port, () => console.log(`Express server is running on port ${port}`));

const io = socketio(server, {cors: {origin: "*"}});
const admin = 'Chat Admin';

const sockets = {};
const lobby = 'BarName';

io.on('connection', socket => {
    //save the socket in our dict of sockets with the user id
    const userId = socket.handshake.query.id;
    const roomId = socket.handshake.query.roomId;
    sockets[userId] = socket;
    console.log('join: ' + lobby)
    socket.join(lobby)

    // test
    console.log(roomId)
    console.log(userId)
    socket.emit('test', "testing ah sheli")

    socket.on('testing', message => {
        console.log(message)

        socket.emit('test2', "hey react")

    });

    socket.on("joinChat", (username) => {
        console.log(username)
        console.log('leave: ' + lobby)
        socket.leave(lobby)

        console.log('join: ' + roomId)
        socket.join(roomId)

        socket.emit('message', formatMessage(admin, `Hey ${username}, enjoy your chat with ${username}`));
        socket.to(roomId).emit('message', formatMessage(admin, `${username} has joined chat...`));

        socket.on('typing', (data) => {
            socket.to(roomId).emit('display', data)
        })

        socket.on('chatMessage', msg => {
            socket.emit('message', formatMessage(username, msg));
            socket.to(roomId).emit('message', formatMessage(username, msg));
        });

        socket.on('close', msg => {
            socket.to(roomId).emit('message', formatMessage(admin, `${msg.user} ${msg.text}`));
            socket.emit('redirect', 'http://localhost:4020/');
        });

        socket.on('disconnect', () => {
            delete sockets[userId];
            socket.leave()
        })
    });
});
