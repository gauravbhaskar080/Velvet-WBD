const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    totalBusiness: {
        type: Number,
        required: true
    },
    totalProfit: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('Admin',AdminSchema);