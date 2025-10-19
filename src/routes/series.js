const express = require('express')
const { create, getAll, remove, getSeriesByBrand } = require('../controllers/series')

const seriesRouter = express.Router()

seriesRouter.post('/create',create)
seriesRouter.get('/get',getAll)
seriesRouter.delete('/delete/:id',remove)
seriesRouter.get('/getbybrand/:id',getSeriesByBrand)

module.exports=seriesRouter