const MongoStorage = require('../data/MongoStorage');

module.exports = class usersRepository {
    constructor() {
        if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS) {
            this.storage = new MongoStorage('user');

        }// needs to add backup in case the of connection in
    }


    async addDoc(obj) {
        const result = await obj.save();
        if (result) {

        } else {
            throw new Error("Error while saving new object");
        }

    }
}
