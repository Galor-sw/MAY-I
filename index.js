require("dotenv").config({path: '.env'});
const express = require("express");
const mongoose = require("mongoose");
const MongoStorage = require("./server/data/mongoStorage");
const bodyParser = require('body-parser');
const signUp = require("./server/routers/signUpRoute");
const login = require('./server/routers/loginRoute');
const homePage = require('./server/routers/homePageRoute');

const port = process.env.PORT || 4020;
const app = express();

// In marag we use express.json, maybe its better?
// i'm not sure what this row means...
app.use(bodyParser.json());

mongoose.set('strictQuery', true);

const DB = new MongoStorage();
const path = require("path");

app.use('/signUp', signUp.signupRoute);
app.use('/homePage', homePage.homePageRouter);
app.use('/login', login.loginRouter);
app.use('/', login.loginRouter);

//load files
app.use('/client/css', express.static(__dirname + '/client/css'));
console.log(__dirname + '/client');
app.use('/client/js', express.static(__dirname + '/client/js'));
app.use('/favicon.ico', express.static('./favicon.ico'));

app.listen(port, () => console.log(`Express server is running on port ${port}`));
