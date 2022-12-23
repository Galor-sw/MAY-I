const bcrypt = require('bcrypt');
const UserRepository = require("../services/dbRepository")
const userRepository = new UserRepository();
const path = require("path");
const signUp = require("../services/signUpService");

exports.sendLoginPage = (req, res) => {
    console.log("sendLoginPage")
    fileSender(req, res, '../../client/index.html')
    //res.sendFile(path.join(__dirname, '../../client/index.html'));
}

exports.sendHomePage = async (req, res, next) => {
    console.log("sendHomePage")
    fileSender(req, res, '../../client/homePage.html')
    //res.sendfile(path.join(__dirname, '../../client/homePage.html'))
}

exports.handleLogin = async (req, res, next) => {
    const Euser = req.body
    const userEmail = Euser.email.toLowerCase();
    const userPassword = req.body.password;
    try {
        const user = await userRepository.getUserByEmail(userEmail);
        if (!user) {
            throw new Error("user doesn't exist")
        }
        if (!await bcrypt.compare(userPassword, user.password)) {
            throw new Error("incorrect password")
        }
    }
    catch (err){
        console.log(err)
    }

    res.status(200);
    res.redirect("/homePage")
}

exports.handleSignUp = async (req, res) => {
    try {
        const user = req.body
        user.email = user.email.toLowerCase();
        console.log("1")
        await signUp.userExist(user.email);
        console.log("2")
        await signUp.saveUser(req.body);
        console.log("3")

        res.status(200);
        res.redirect('/');

    } catch (e) {
        console.log("4")
        res.status(401).json({message: e.message});
    }
}

const fileSender = (req, res, val) => {
    res.sendFile(path.join(__dirname, val));
}
