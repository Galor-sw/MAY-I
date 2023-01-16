require('dotenv').config({path: '.env'});
const express = require("express");
const bodyParser = require('body-parser');
const totalSession = require('./server/routers/sessionRoute');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');


const port = process.env.PORT || 4020;
const app = express();

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

//load files
app.use('/client/css', express.static(__dirname + '/client/css'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

app.listen(port, () => console.log(`Express server is running on port ${port}`));
