const mongoose = require('mongoose');
const { route } = require('../routes/api');
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