const express = require("express");
const app = express();

const signUp = require("./signUpRoute");
const login = require('./loginRoute');


app.use('/signUp', signUp.signupRoute);
app.use('/login', login.loginRouter);


module.exports = {app}