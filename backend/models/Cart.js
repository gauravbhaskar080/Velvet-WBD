const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Object'
    }]
})
module.exports = mongoose.model('Cart',CartSchema);