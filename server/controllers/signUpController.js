// const signUp = require("../services/signUpService");
// const dbHandler = require('../services/dbRepository');
//
//
// handleSignUp = async (req, res) => {
//     try {
//         const user = req.body
//         user.email = user.email.toLowerCase();
//         await signUp.userExist(user.email);
//         await signUp.saveUser(req.body);
//         return res.status(200);
//
//     } catch (e) {
//         return res.status(401).json({message: e.message});
//     }
// }
//
// module.exports = {handleSignUp}
