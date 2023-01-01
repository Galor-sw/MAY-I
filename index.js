require("dotenv").config({path: '.env'});
const express = require("express");
const bodyParser = require('body-parser');
const login = require('./server/routers/loginRoute');
const path = require('path');
const fs = require("fs");
const cors = require('cors')

const port = process.env.PORT || 4020;
const app = express();

app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


app.use('/', login.loginRouter);

//load files
app.use('/client/css', express.static(__dirname + '/client/css'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

app.listen(port, () => console.log(`Express server is running on port ${port}`));
