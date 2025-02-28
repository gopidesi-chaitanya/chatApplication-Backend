const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());


app.get('/',(req,res)=>{
  res.send('<h1>hello world</h1>')
  })


const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {

  console.log('A user connected');
  socket.on('chat-message', ({ username, message }) => {
    console.log(`${username}: ${message}`);
    io.emit('chat-message', { username, message });
  });

  socket.on('send-gif', ({ username, message }) => {
    console.log(`${username}: ${message}`);
    io.emit('send-gif', { username, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
