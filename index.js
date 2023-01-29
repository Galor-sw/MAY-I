require('dotenv').config({path: '.env'});
const express = require("express");
const bodyParser = require('body-parser');
const totalSession = require('./server/routers/sessionRoute');
const connectedRoute = require('./server/routers/connectedRoute');
const cors = require('cors')

const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const URL = process.env.URL
const port = process.env.PORT || 4020;
const app = express();

// cookie parser middleware
console.log(URL);
// app.use(cors({
//     origin: `http://localhost:3000`,
//     credentials: true
// }))
app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}))
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
    const userId = socket.handshake.query.userId;
    const roomId = socket.handshake.query.roomId;

    sockets[userId] = socket;
    console.log('userId is: ' + userId)

    if (roomId) {
        socket.join(roomId)
        console.log('joined to room: ' + roomId)
    }

    socket.on('refuseChat', user => {
        console.log(Object.keys(sockets))
        console.log(sockets[user])
        console.log(user)
        if (user.senderId in sockets)
        {
            //we should change the userId to name
            io.to(sockets[user.senderId].id)
                .emit('message', formatMessage(admin, `${user.name} refused to chat with you`));
        }
    });

    socket.on('drinkInvite', data => {

        console.log(data.sender)
        console.log(data.userId)
        console.log(data.drink)

        //we should change the userId to name
        if (data.userId in sockets) {
            io.to(sockets[data.userId].id)
                .emit('drinkInvite', {
                    message: `sent you a ${data.drink}`,
                    sender: data.sender
                })
        }
    });

    // user= user to send the invite to
    socket.on('ChatInvite', user => {

        //we should change the userId to name
        if (user in sockets) {
            io.to(sockets[user].id)
                .emit('ChatInvite', {
                    message: `invited you to a private chat`,
                    receiver: user,
                    sender: userId
                })
        }
    });

    socket.on("joinChat", (username) => {
        console.log(username)

        socket.emit('message', formatMessage(admin, `Hey ${username}, enjoy your chat`));
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
            console.log('deleted')
            delete sockets[userId];
            socket.leave()
        })
    });
});
