const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    seriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "series"
    }
})

const Devices = mongoose.model("Devices", deviceSchema)

module.exports = Devices