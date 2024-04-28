const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: String,
    password: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    totalbusiness: {
        type: Number,
        required: true
    },
    productsquantityEnding: [{
        type: Schema.Types.ObjectId,
        ref: 'Object'
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', currentTime: () => Date.now() } }
);

module.exports = mongoose.model('Company',CompanySchema);