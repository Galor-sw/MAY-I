const MongoStorage = require('../data/MongoStorage');
const User = require('../models/User.model')

module.exports = class UsersRepository {
    constructor() {
        if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
            this.storage = new MongoStorage('user');
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


    getUserByEmail = async (mail) => {
        return User.findOne({email: mail});
    }


    async addDoc(obj) {
        const result = await obj.save();
        if (result) {

        } else {
            throw new Error("Error while saving new object");
        }

    }
};





















