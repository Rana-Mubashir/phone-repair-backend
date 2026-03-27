
const express = require('express')
const { addNewMessage, getChatMessages, getChats } = require('../controllers/chat')

const chatRouter = express.Router()

chatRouter.post('/', addNewMessage)
chatRouter.get('/:sessionId', getChatMessages)
chatRouter.get('/',getChats)

module.exports = chatRouter