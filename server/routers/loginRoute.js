const express = require("express");
const loginRouter = new express.Router();
const loginController = require('../controllers/loginController');
const path = require("path");

loginRouter.use(express.json());

loginRouter.post('/', loginController.handleLogin);

module.exports = {loginRouter};