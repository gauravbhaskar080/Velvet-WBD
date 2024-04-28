const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    phone:{
        type: String,
    },
    address: {
        type: String,
    },
    pincode: {
        type: String
    },
    photo: {
        type: String
    },
    totalPurchase: {
        type: Number
    }
})
module.exports = mongoose.model('Customer',CustomerSchema);