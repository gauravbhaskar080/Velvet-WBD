const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeObjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Object'
    }],
    designimg: {
        type: String,
        required: true
    },
    openid: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('HomeObject',HomeObjectSchema);