const bcrypt = require('bcrypt');
const UserRepository = require("../repositories/userRepository")
const userRepository = new UserRepository();
const path = require("path");
const signUp = require("../services/signUpService");
const {cloudinary} = require("../data/cloud");
const {ImageModel} = require("../models/Image.model");


//////////////////////////////////////////////////////////////////////

exports.sendLoginPage = (req, res) => {
    console.log("sendLoginPage")
    fileSender(req, res, '../../client/index.html')
    //res.sendFile(path.join(__dirname, '../../client/index.html'));
}
exports.sendQRPage = (req, res) => {
    console.log("sendQRCodePage")
    fileSender(req, res, '../../client/qrCode.html')
    //res.sendFile(path.join(__dirname, '../../client/index.html'));
}
exports.sendHomePage = async (req, res, next) => {
    console.log("sendHomePage")
    fileSender(req, res, '../../client/homePage.html')
    //res.sendfile(path.join(__dirname, '../../client/homePage.html'))
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
    } catch (err) {
        console.log(err)
    }
    res.redirect("/qrCode")
}

exports.handleSignUp = async (req, res) => {
    try {
        const user = req.body;
        const {image} = user;
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
        console.log("4")
        res.status(401).json({message: e.message});
    }
}

exports.handleLogOut = function (req, res) {
    if (req.session) {
        // Destroy the session
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                res.send("Error while logging out.");
            } else {
                res.redirect("/");
            }
        });
    } else {
        // Redirect to login page if no session exists
        res.redirect("/");
    }
}

exports.getSessionInfo = function (req, res) {
    if (req.session.hasOwnProperty('user'))
        res.status(200).json(req.session.user);
    else
        res.status(404).json({});
}

const fileSender = (req, res, val) => {
    res.sendFile(path.join(__dirname, val));
}
