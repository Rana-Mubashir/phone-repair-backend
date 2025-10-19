const imageKit = require('../utils/imageKitConfig')

async function uploadSingle(req, res) {
    try {

        const file = req.file

        if (!file) {
            return res.status(400).json({
                message: "No File Found!!!"
            })
        }

        const response = await imageKit.upload({
            file: file.buffer.toString("base64"),
            fileName: file.originalname
        })

        if(!response){
            return res.status(500).json({
                message:"Internal Server error!!!"
            })
        }

        return res.status(201).json({
            message: "Image Uploaded Sucessfully!!!",
            response
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!!!",
            error: error.message
        })
    }
}

module.exports = uploadSingle