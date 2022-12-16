
const bcrypt = require('bcrypt');
const dbRepository = require('../services/dbRepository');


const handleLogin = async (req, res, next) => {
    const Euser = req.body
    const userEmail = Euser.email.toLowerCase();
    const userPassword = req.body.password;
    const user = await dbRepository.getUserByEmail(userEmail)
    if (!user) {
        throw new Error("user doesn't exist")
    }
    if (!await bcrypt.compare(userPassword, user.password)) {
        throw new Error("incorrect password")
    }
    res.status(200);
    res.redirect("/homePage")
}

module.exports = {handleLogin};