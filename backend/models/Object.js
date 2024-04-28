const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    features:{
        type: Map,
        of: String
    },
    companyusername: {
        type: String,
        required: true
    },
    key_points: [{
        type: String,
    }],
    images: [{
        type: String,
        required: true
    }],
    margin: {
        type: Number,
        required: true
    },
    registered: {
        type: Date,
        required: true
    },
    quantitySold: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Object',ObjectSchema);