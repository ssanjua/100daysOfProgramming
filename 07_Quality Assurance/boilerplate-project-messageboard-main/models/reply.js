const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: {type: String, required: true},
    created_on: {type: Date},
    reported: {type: Boolean, default: false, select: false},
    delete_password: {type: String, required: true, select: false},
    _id: {type: Number, required: true},
}, {versionKey: false});

module.exports = replySchema;