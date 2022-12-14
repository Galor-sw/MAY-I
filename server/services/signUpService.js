const User = require('../models/users');
const UserRepository = require("./dbRepository")
const userRepository = new UserRepository();
const bcrypt = require("bcrypt");


async function userExist(mail) {
    const exist = await User.findOne({email: mail});
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
        "image": user.image,
        "loginDate": new Date(),
        "password": user.password
    });
    await userRepository.addDoc(newUser);

}

module.exports = {saveUser, userExist}
