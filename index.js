// Importa express y socket.io
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: ['https://gxiibtm-anonymous-8081.exp.direct']
}));

const server = http.createServer(app);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });


const io = socketIo(server, {
  cors:  {
    origin: ['https://gxiibtm-anonymous-8081.exp.direct'],
    methods: ['GET', 'POST'],
    allowedHeaders: ["sender"],
    credentials: true,
  }
});

io.on('connection', socket => {
  console.log('Nuevo cliente conectado:', socket.id);
  
  socket.on('messageSend', (socketId, msg, reciever) => {
    console.log(socketId, msg, reciever);
    io.emit('serverConnected');
    // io.to(reciever).emit('recieveMessage', msg, socketId);
  });
});

server.listen(5001, () => {
  console.log('Servidor corriendo en el puerto 5001');
});
