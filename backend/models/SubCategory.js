const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    showtopimg: {
        type: String
    },
    dispimg: {
        type: String
    },
    filters: {
        type: Map,
        of: [String]
    }
})
module.exports = mongoose.model('SubCategory',SubCategorySchema);