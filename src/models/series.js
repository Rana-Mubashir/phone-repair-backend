const mongoose = require('mongoose')

const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brands"
    }
})

const Series = mongoose.model("Series", seriesSchema)

module.exports = Series