const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    designimgs: [{
        type: String
    }]
})
module.exports = mongoose.model('Category',CategorySchema);