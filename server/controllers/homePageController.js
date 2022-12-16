const dbRepository = require("../services/dbRepository");
const bcrypt = require("bcrypt");


const handleHomePage = async (req, res, next) => {
    res.send("../client/homePage.html")
}

module.exports = {handleHomePage};