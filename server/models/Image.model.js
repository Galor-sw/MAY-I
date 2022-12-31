const {model, Schema} = require('mongoose');

const ImageSchema = new Schema({
    email: {type: String, required: true},
    image: {
        data: Buffer,
        contentType: String
    },
}, {collection: 'image'});

const ImageModel = model('image', ImageSchema);


module.exports = ImageModel;

