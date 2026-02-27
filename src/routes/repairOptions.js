const express = require('express')
const { create, getRepairOptions,getDeviceRepairOptions, remove, update, getRepairOptionWithDevice } = require('../controllers/repairOptions')

const router = express.Router()

router.post('/create', create)
router.delete('/delete/:id', remove)
router.put('/update/:id',update)
router.get('/get/:id', getRepairOptions)
router.get('/getdeviceoptions/:id', getDeviceRepairOptions)
router.get('/getrepairdetail/:id', getRepairOptionWithDevice)


module.exports = router