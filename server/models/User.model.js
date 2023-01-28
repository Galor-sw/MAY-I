const {model, Schema} = require('mongoose');
const {ImageSchema} = require("./Image.model");

const userSchema = new Schema({
    username: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true, set: email => email.toLowerCase()},
    age: {type: Number, required: false},
    gender: {type: String, required: true},
    description: {type: String, required: false},
    image: { type: ImageSchema },
    loginDate: {type: Date, default: new Date()},
    password: {type: String, required: true},
}, {collection: 'user'});

const User = model('user', userSchema);


module.exports = User;

