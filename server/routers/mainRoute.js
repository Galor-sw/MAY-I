const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const signUp = require("./signUpRoute");
const login = require('./loginRoute')
const homePage = require('./homePageRoute')

app.use(bodyParser.json());

app.use('/signUp', signUp.signupRoute);
app.use('/login', login.loginRouter);
app.use('/homePage', homePage.homePageRouter);



module.exports = {app}