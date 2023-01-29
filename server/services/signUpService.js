const UserRepository = require("../repositories/userRepository")
const userRepository = new UserRepository();
const bcrypt = require("bcrypt");
const User = require("../models/User.model")
const path = require('path');
const fs = require("fs");

async function userExist(mail) {
    const exist = await userRepository.retrieve({email: mail});
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
        "email": user.email,
        "age": user.age,
        "gender": user.gender,
        "description": user.description,
        "loginDate": new Date(),
        "image": user.image,
        "password": user.password
    });
    await userRepository.addDoc(newUser);

}

module.exports = {saveUser, userExist}
