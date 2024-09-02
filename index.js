
io = require('socket.io')(5000, {
    cors:  {
        origin: ['http://localhost:3000']
    }
})
io.on('connection', socket => {
    console.log(socket.id)
    socket.on('messageSend', (socketId, msg, reciever) => {
        io.to(reciever).emit('recieveMessage', msg, socketId)
    })
})
