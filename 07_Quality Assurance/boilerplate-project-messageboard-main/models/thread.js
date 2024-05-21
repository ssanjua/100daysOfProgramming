const mongoose = require('mongoose');
const Reply = require('./reply.js');

const threadSchema = new mongoose.Schema({
    text: {type: String, required: true},
    created_on: {type: Date},
    bumped_on: {type: Date},
    reported: {type: Boolean, default: false},
    delete_password: {type: String, required: true},
    replies: {type: [Reply], default: []},
    replyNext : {type: Number, default: 1},
    board: {type: String, required: true}
}, {versionKey: false});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;