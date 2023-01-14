const express = require("express");
const sessionRouter = new express.Router();
const session_controller = require('../controllers/sessionController');


sessionRouter.use(express.json());

sessionRouter.get('/', session_controller.sendLoginPage)
sessionRouter.get('/homePage', session_controller.sendHomePage);
sessionRouter.get('/userInfo', session_controller.getSessionInfo)
sessionRouter.get('/chat', session_controller.sendChatPage)

sessionRouter.post('/login', session_controller.handleLogin);
sessionRouter.post('/signUp', session_controller.handleSignUp);
sessionRouter.post('/logOut', session_controller.handleLogOut);


module.exports = {sessionRouter};
