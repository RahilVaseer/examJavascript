const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({

    message: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    },
    sendedAt: {
        type: String,
        required: true
    },
    // MessageBy: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }]
});

module.exports = mongoose.model('Message', MessageSchema);