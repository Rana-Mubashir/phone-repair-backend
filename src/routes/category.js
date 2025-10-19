const express=require('express')
const {create,remove,update,getAll} =require('../controllers/category')

const router=express.Router()

router.post('/create',create)
router.delete('/delete/:id',remove)
router.put('/update/:id',update)
router.get('/getall',getAll)

module.exports=router