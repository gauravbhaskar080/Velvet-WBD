const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BoughtSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Object',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date
    },
    returnupto: {
        type: Date
    },
    discount:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    couponcode: {
        type: String
    },
    companyName: {
        type: String
    }
})
module.exports = mongoose.model('Bought',BoughtSchema);