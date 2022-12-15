const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const signUp = require("./signUpRoute");
const login = require('./loginRoute');


app.use(bodyParser.json());

app.use('/signUp', signUp.signupRoute);
app.use('/login', login.loginRouter);


module.exports = {app}