const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscountCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountpercent: {
        type: Number,
        required: true
    },
    to: [{
        type: String,
        required: true
    }]
})
module.exports = mongoose.model('DiscountCode',DiscountCodeSchema);