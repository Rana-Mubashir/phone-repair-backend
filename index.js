const {app,server} = require('./src/app')
const dotenv = require('dotenv')
const connectDb = require('./src/db/db')

dotenv.config()

connectDb()
    .then(() =>
        server.listen(process.env.PORT, () => {
            console.log(`app listenting at port ${process.env.PORT}`)
        })
    )
    .catch(() =>
        console.log("There is a problem in listening server")
    )
