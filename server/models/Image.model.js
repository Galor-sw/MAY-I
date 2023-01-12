const {model, Schema} = require('mongoose');

const ImageSchema = new Schema({
    imageId: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String,
        required: true
    }
});

const ImageModel = model('image', ImageSchema);


module.exports = {ImageModel, ImageSchema};

