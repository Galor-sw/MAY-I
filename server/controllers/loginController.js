const bcrypt = require('bcrypt');
const UserRepository = require("../repositories/userRepository")
const userRepository = new UserRepository();
const imageRepository = require("../repositories/imageRepository");
const newImage = new imageRepository;
const path = require("path");
const signUp = require("../services/signUpService");
const fs = require("fs");


/////////////////////////////////////////////////////////////////////////////////
const multer = require("multer");


//Storage
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage
}).single('image')

/////////////////////


//////////////////////////////////////////////////////////////////////

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
    } catch (err) {
        console.log(err)
    }

    res.status(200);
    res.redirect("/homePage")
}

exports.handleSignUp = async (req, res) => {
    try {
        await upload(req, res, (err) => {
            if (err) {
                console.log(err)
            } else {
                const imgChunk = {
                    email: req.body.email,
                    image: {
                        data: req.body.image.filename,
                        contentType: 'image/png'
                    }
                }
                newImage.create(imgChunk);
            }
        })
        const user = req.body
        user.email = user.email.toLowerCase();
        await signUp.userExist(user.email);
        await signUp.saveUser(req.body);

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
