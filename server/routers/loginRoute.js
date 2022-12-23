const express = require("express");
const loginRouter = new express.Router();
const login_controller = require('../controllers/loginController');

loginRouter.use(express.json());

loginRouter.get('/', login_controller.sendLoginPage)
loginRouter.get('/homePage', login_controller.sendHomePage);

loginRouter.post('/login', login_controller.handleLogin);
loginRouter.post('/signUp', login_controller.handleSignUp);


module.exports = {loginRouter};
