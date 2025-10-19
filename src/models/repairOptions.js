const mongoose = require('mongoose')

const repairSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    estimatedTime: {
        type: String,
        required: true
    },
    warranty: {
        type: String,
        required: true
    },
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "devices"

    }
})

const RepairOptions = mongoose.model("RepairOptions", repairSchema)

module.exports = RepairOptions
