const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/loginController');

loginRouter.use(express.json());

loginRouter.post('/', login_controller.handleLogin);


module.exports = {loginRouter};