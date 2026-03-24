const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    role: {
        type: String,
        enum: ['admin', 'manager'],
        default: 'admin'
    }
})

const Users = new mongoose.model('Users', userSchema)

module.exports = Users;