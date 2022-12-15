const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const signUp = require("./signUpRoute");

app.use(bodyParser.json());

app.use('/signUp', signUp.signupRoute);


module.exports = {app}