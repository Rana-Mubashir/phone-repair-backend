
const Chats = require('../models/chat')
const { io } = require('../app')


const addNewMessage = async (req, res) => {
    try {

        const { sessionId, message, role } = req.body

        if (!sessionId || !message || !role) {
            return res.status(400).json({
                message: "All fields must be required!"
            })
        }

        let session = await Chats.findOne({ sessionId })

        if (!session) {
            const chatId = "USER-" + Math.floor(1000 + Math.random() * 9000);
            session = await Chats.create({ sessionId, messages: [], chatId })
        }

        session.messages.push({ message, role })

        await session.save()

        return res.status(201).json({
            message: "Message sent sucessfully!",
            messages: session.messages
        })

    } catch (error) {
        console.log("error in sending message",error)
        return res.status(500).json({
            message: "Internal server error!",
            error: error.message
        })
    }
}

const getChatMessages = async (req, res) => {
    try {

        const { sessionId } = req.params

        if (!sessionId) {
            return res.status(400).json({
                message: "Session Id must be required!"
            })
        }

        const chat = await Chats.findOne({ sessionId })

        if (!chat) {
            return res.status(404).json({
                message: "No chat found! "
            })
        }

        return res.status(200).json({
            message: "chat fetched!",
            chat
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!",
            error: error.message
        })
    }
}

const getChats = async (req, res) => {
    try {

        const chats = await Chats.find()

        if (!chats || chats.length === 0) {
            return res.status(200).json({
                message: "No chats found",
                chats: []
            })
        }

        return res.status(200).json({
            message: "Chats Fetched!",
            chats
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!",
            error: error.message
        })
    }
}

module.exports = { addNewMessage, getChatMessages, getChats }