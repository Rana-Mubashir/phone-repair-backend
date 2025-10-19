const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }

})

const Brands = mongoose.model('Brands', brandSchema)

module.exports = Brands