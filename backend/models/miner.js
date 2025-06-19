const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const minerSchema = new Schema({
    uid: {
        type: Number,
        required: true
    },
    apiPath: {
        type: String,
        required: true
    },
    socketioPath: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Miner', minerSchema);