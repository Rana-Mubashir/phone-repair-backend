const express = require('express')
const { create, getAll, remove, getDeviceByBrand, getAllDevicesName } = require('../controllers/Device')

const router = express.Router()

router.post('/create', create)
router.delete('/delete/:id',remove)
router.get('/get',getAll)
router.get('/getdevicesbybrand/:id',getDeviceByBrand)
router.get('/getdevicesname',getAllDevicesName)


module.exports = router