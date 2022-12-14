const UserRepository = require("../repositories/userRepository")
const userRepository = new UserRepository();
const bcrypt = require("bcrypt");
const path = require('path');
const fs = require("fs");

async function userExist(mail) {
    const exist = await userRepository.find({email: mail});
    if (exist) {
        throw new Error("Email already exists");
    }
}

const saveUser = async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
    }

    const newUser = new User({
        "username": user.username,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "type": user.type,
        "email": user.email,
        "address": user.address,
        "gender": user.gender,
        "job": user.job,
        "description": user.description,
        "loginDate": new Date(),
        "password": user.password
    });
    await userRepository.addDoc(newUser);

}

module.exports = {saveUser, userExist}
