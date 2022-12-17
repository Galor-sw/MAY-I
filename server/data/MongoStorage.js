const {EventEmitter} = require('events');
const mongoose = require('mongoose');
const Path = require('path');

module.exports = class MongoStorage extends EventEmitter {
    constructor(entity) {
        super();
        this.connect();
    }


    connect() {
        const connectionUrl = `mongodb+srv://May-i-DB:BuULGfKG4mBkBxAm@cluster0.exaxgdi.mongodb.net/May-i-DB?retryWrites=true&w=majority`;
        mongoose
            .connect(connectionUrl)
            .then(() => console.log(`connected to May-i-DB collection`))
            .catch(err => console.log(`connection error: ${err}`));
    }

    // find() {
    //     return this.Model.find({});
    // }
    //
    // retrieve(id) {
    //     return this.Model.find({id});
    // }
    //
    // create(data) {
    //     const entity = new this.Model(data);
    //     entity.save();
    // }
    //
    // delete(id) {
    //     return this.Model.deleteOne({id});
    // }

}
