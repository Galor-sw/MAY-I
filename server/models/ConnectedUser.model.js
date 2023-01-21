const {model, Schema, mongoose} = require('mongoose');

const connectedUsersSchema = new Schema({
    user_id: {type: mongoose.Types.ObjectId, ref: 'user', require: true},
    seat: {
        row: {type: Number, required: true},
        col: {type: Number, required: true}
    }
}, {collection: 'connectedUser'});

const connectedUser = model('connectedUser', connectedUsersSchema);

module.exports = connectedUser;

