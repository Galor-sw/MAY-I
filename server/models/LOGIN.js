// const {Schema, model} = require('mongoose');

const loginSchema = new Schema({
    email: {type: String, required: true, set: email => email.toLowerCase()},
    password: {type: String, required: true},
    creationDate: {type: Date, required: true}
}, {collection: 'LOGIN'});

const LOGIN = model('LOGIN', loginSchema);

module.exports = LOGIN;