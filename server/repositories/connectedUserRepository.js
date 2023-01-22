const MongoStorage = require('../data/MongoStorage');

module.exports = class connectedUser {
    constructor() {
        if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
            this.storage = new MongoStorage('connectedUser');
        }
    }

    getAll() {
        return this.storage.find().populate({path: 'user_id', model:'user'});
    }

    create(obj) {
        return this.storage.create(obj);
    }
}
