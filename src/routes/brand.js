const express = require('express')
const { create, remove, update, getAll, getBrandsByCategory } = require('../controllers/brand')

const brandRouter = express.Router()

brandRouter.post('/create',create)
brandRouter.delete('/delete/:id',remove)
brandRouter.put('/update/:id',update)
brandRouter.get('/getall',getAll)
brandRouter.get('/getbycategory/:id',getBrandsByCategory)

module.exports=brandRouter