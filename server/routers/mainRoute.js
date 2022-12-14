const express = require("express");
const app = express();

const signUp = require("./signUpRoute");

app.use('/signUp', signUp.signupRoute);


module.exports = {app}