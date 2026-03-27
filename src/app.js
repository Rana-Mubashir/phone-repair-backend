const express = require('express')
const cors = require('cors')

const categoryRouter = require('./routes/category')
const brandRouter = require('./routes/brand')
const seriesRouter = require('./routes/series')
const deviceRouter = require('./routes/device')
const repairOptionsRouter = require('./routes/repairOptions')
const addressRouter = require('./routes/shopAddresses')
const bookingRouter = require('./routes/booking')
const chatRouter = require('./routes/chat')

const imageRouter = require('./routes/imageKit')
const userRouter = require('./routes/users')
const http = require("http");
const { Server } = require("socket.io");

const app = express()

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (sessionId) => {
        socket.join(sessionId);
        console.log("Joined room:", sessionId);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

    socket.on('send_message', ({ sessionId, message, role}) => {
        console.log("send message in socket",message)
        io.to(sessionId).emit('receive_message', {sessionId,message,role,})
    })

});


app.use('/api/category', categoryRouter)
app.use('/api/brand', brandRouter)
app.use('/api/image', imageRouter)
app.use('/api/series', seriesRouter)
app.use('/api/device', deviceRouter)
app.use('/api/repairoptions', repairOptionsRouter)
app.use('/api/address', addressRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)

app.use('/', (req, res) => {
    return res.status(200).json({
        message: "Server is working!!!!"
    })
})

module.exports = { app, server, io };