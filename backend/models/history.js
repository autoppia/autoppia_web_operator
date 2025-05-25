const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    socketioPath: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    initialUrl: {
        type: String,
        required: true
    },
    historyPath: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('History', historySchema);