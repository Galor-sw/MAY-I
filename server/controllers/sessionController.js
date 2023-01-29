const ConnectedUsers = require("../repositories/connectedUserRepository")
const connectedUsers = new ConnectedUsers();
const bcrypt = require('bcrypt');
const UserRepository = require("../repositories/userRepository")
const userRepository = new UserRepository();
const path = require("path");
const signUp = require("../services/signUpService");
const {cloudinary} = require("../data/cloud");
const {ImageModel} = require("../models/Image.model");
const crypto = require('crypto');
const sessionId = crypto.randomBytes(32).toString('hex');

exports.sendLoginPage = (req, res) => {
    console.log("sendLoginPage")
    fileSender(req, res, '../../client/index.html')
}
exports.sendQRPage = (req, res) => {
    console.log("sendQRCodePage")
    fileSender(req, res, '../../client/qrCode.html')
    //res.sendFile(path.join(__dirname, '../../client/index.html'));
}
exports.sendHomePage = async (req, res, next) => {
    console.log("sendHomePage")
    fileSender(req, res, '../../client/homePage1.html')
}

exports.handleLogin = async (req, res, next) => {
    const userBody = req.body;
    const userEmail = userBody.email.toLowerCase();
    const userPassword = req.body.password;
    try {
        const user = await userRepository.getUserByEmail(userEmail);
        if (!user) {
            throw new Error("user doesn't exist")
        }
        if (!await bcrypt.compare(userPassword, user.password)) {
            throw new Error("incorrect password")
        }
        req.session.user = user;
        res.send(`${user._id}`)
    } catch (err) {
        console.log(err)
    }

}

exports.handleSignUp = async (req, res) => {
    try {
        const user = req.body;
        const image = user.image;
        const uploadedStatus = await cloudinary.v2.uploader.upload(image, {
            upload_preset: "users_profile"
        });
        user.image = new ImageModel({
            imageId: uploadedStatus.public_id,
            ImageUrl: uploadedStatus.secure_url
        });
        user.email = user.email.toLowerCase();
        await signUp.userExist(user.email);
        await signUp.saveUser(user);
        res.status(200);
        res.redirect('/');

    } catch (e) {
        console.log("4");
        console.log(e);
        res.status(401).json({message: e.message});
    }
}

exports.handleLogOut = async function (req, res) {
    const unconnected = await connectedUsers.delete(req.body);
    if (!unconnected) {
        throw new Error("failed to logout")
    }
    res.send(200);
}

const fileSender = (req, res, val) => {
    res.sendFile(path.join(__dirname, val));
}

exports.sendChatPage = (req, res) => {
    console.log("sendChatPage")
    fileSender(req, res, '../../client/chat.html')
}



