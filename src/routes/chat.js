
const express = require('express')
const { addNewMessage, getChatMessages } = require('../controllers/chat')

const chatRouter = express.Router()

chatRouter.post('/', addNewMessage)
chatRouter.get('/:sessionId', getChatMessages)

module.exports = chatRouter