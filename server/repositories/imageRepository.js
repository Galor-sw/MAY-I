const MongoStorage = require('../data/MongoStorage');

module.exports = class imageRepository {
    constructor() {
        if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
            this.storage = new MongoStorage('image');
        }
    }

    find() {
        return this.storage.find();
    }

    retrieve(param) {
        return this.storage.retrieve(param);
    }

    create(obj) {
        return this.storage.create(obj);
    }

    update(param, data) {
        return this.storage.update(param, data);
    }

    delete(email) {
        return this.storage.delete(email);
    }
}