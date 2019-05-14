const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    email: {
        type: Array,
        required:true
    }
});

module.exports = mongoose.model('Image', imageSchema);