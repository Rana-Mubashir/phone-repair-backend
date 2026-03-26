const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"]
    }
}, { timestamps: true })

const chatSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    chatId: {
        type: String,
        required: true
    },
    messages: [messageSchema]
}, { timestamps: true })

const Chats = mongoose.model("Chats", chatSchema)

module.exports = Chats
