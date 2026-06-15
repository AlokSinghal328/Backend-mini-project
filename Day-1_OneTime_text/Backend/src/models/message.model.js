const mongoose = require('mongoose');
const { CHAR_LIMIT } = require('../constants');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        maxLength: CHAR_LIMIT,
        trim: true
    },
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;