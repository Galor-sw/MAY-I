require('dotenv').config({path: '.env'});
const express = require("express");
const bodyParser = require('body-parser');
const totalSession = require('./server/routers/sessionRoute');
const path = require('path');
const fs = require("fs");
const cors = require('cors')
const session = require('express-session');
const cookieParser = require("cookie-parser");


const port = process.env.PORT || 4020;
const app = express();

// cookie parser middleware
app.use(cookieParser());
// creating 24 hours from milliseconds
const Day = 1000 * 60 * 60 * 24;
// session middleware
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: Day}
}));

app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))


app.use('/', totalSession.sessionRouter);

//load files
app.use('/client/css', express.static(__dirname + '/client/css'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

app.listen(port, () => console.log(`Express server is running on port ${port}`));
