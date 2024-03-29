const express = require("express");
const connectedRouter = new express.Router();
const connected_controller = require("../controllers/connectedController");

connectedRouter.use(express.json());

connectedRouter.get('/connectedUsers', connected_controller.getAll);
connectedRouter.get('/user/:id', connected_controller.getOne);
connectedRouter.post('/user', connected_controller.addUser);

module.exports = {connectedRouter};

