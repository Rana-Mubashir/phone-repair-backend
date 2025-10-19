const express = require('express')
const cors=require('cors')

const categoryRouter = require('./routes/category')
const brandRouter =require('./routes/brand')
const seriesRouter=require('./routes/series')
const deviceRouter=require('./routes/device')
const repairOptionsRouter =require('./routes/repairOptions')

const imageRouter=require('./routes/imageKit')

const app = express()
app.use(cors()); 
app.use(express.json()); 

app.use('/api/category', categoryRouter)
app.use('/api/brand',brandRouter)
app.use('/api/image',imageRouter)
app.use('/api/series',seriesRouter)
app.use('/api/device',deviceRouter)
app.use('/api/repairoptions',repairOptionsRouter)


app.use('/', (req, res) => {
    return res.status(200).json({
        message: "Server is working horray!!!!"
    })
})

module.exports = app