require("dotenv").config({path: '.env'});
const express = require("express");
const bodyParser = require('body-parser');
//const signUp = require("./server/routers/signUpRoute");
const login = require('./server/routers/loginRoute');
//const homePage = require('./server/routers/homePageRoute');
const path = require('path');
const fs = require("fs");


const port = process.env.PORT || 4020;
const app = express();

// In maarag we use express.json, maybe its better?
// i'm not sure what this row means...
app.use(bodyParser.json());

//app.use('/signUp', signUp.signupRoute);
//app.use('/homePage', homePage.homePageRouter);
app.use('/', login.loginRouter);

//load files
app.use('/client/css', express.static(__dirname + '/client/css'));
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

app.listen(port, () => console.log(`Express server is running on port ${port}`));
