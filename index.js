console.log('Server OK')
io = require('socket.io')(5000, {
    cors:  {
        origin: ['http://localhost:8081/'],
        methods: ['GET', 'POST'],
    }
})
io.on('connection', socket => {
    console.log(socket.id)
    socket.on('messageSend', (socketId, msg, reciever) => {
        console.log(socketId, msg, reciever)
        io.emit('serverConnected')
        // io.to(reciever).emit('recieveMessage', msg, socketId)
    })
    
})
