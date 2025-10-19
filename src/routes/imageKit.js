const multer = require('multer')
const express = require('express')
const uploadSingle = require('../controllers/imageKit')

const imageRouter = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

imageRouter.post('/upload', upload.single("image"), uploadSingle)


module.exports=imageRouter