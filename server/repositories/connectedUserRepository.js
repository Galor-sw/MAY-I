const MongoStorage = require('../data/MongoStorage');

module.exports = class connectedUser {
    constructor() {
        if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
            this.storage = new MongoStorage('connectedUser');
        }
    }

    getAll() {
        return this.storage.find();
    }

    create(obj) {
        return this.storage.create(obj);
    }
}
