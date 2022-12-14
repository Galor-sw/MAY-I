const LOGIN = require('../models/LOGIN');
const USERS = require('../models/users');
const dbHandler = require('../services/dbHandler');


async function userExist(mail) {
    const exist = await USERS.findOne({email: mail});
    if (exist) {
        throw new Error("Email already exists");
    } else {
        const userEmail = mail.toLowerCase();
        await LOGIN.findOneAndDelete({'email': userEmail});
    }

}


async function saveUser(user) {

    const newLOGIN = new LOGIN({"email": user.email, "password": user.password, "creationDate": new Date()});
    await dbHandler.addDoc(newLOGIN);

}

module.exports = {saveUser, userExist}
