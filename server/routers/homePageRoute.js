const express = require("express");
const homePageRouter = new express.Router();
const homePageController = require('../controllers/homePageController');

homePageRouter.post('/', homePageController.handleHomePage);

module.exports = {homePageRouter};