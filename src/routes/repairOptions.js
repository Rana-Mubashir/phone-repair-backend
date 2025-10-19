const express = require('express')
const { create, getRepairOptions,getDeviceRepairOptions, remove, update } = require('../controllers/repairOptions')

const router = express.Router()

router.post('/create', create)
router.delete('/delete/:id', remove)
router.put('/update/:id',update)
router.get('/get/:id', getRepairOptions)
router.get('/getdeviceoptions/:id', getDeviceRepairOptions)

module.exports = router