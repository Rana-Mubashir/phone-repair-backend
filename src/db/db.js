const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

async function connectDb() {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.log("error in connection db", error)
        throw error
    }
}

module.exports = connectDb