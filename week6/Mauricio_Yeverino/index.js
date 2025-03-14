const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('chat message', "Someone Connected!");
  socket.nickname = null
  socket.on('disconnect', () => {
    io.emit('chat message', "Someone Left :(");
  });
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    if (msg.includes("Nickname:")){
        ind = msg.indexOf(':')
        socket.nickname = msg.substring(ind + 1, msg.length)
        return;
    }
    if (socket.nickname) {
      msg = `${socket.nickname}: ${msg}`
    } else {
      msg = `₍^. .^₎: ${msg}`
    }
    const time = new Date()
    msg = `${msg} ${time.getMonth()}/${time.getDay()}/${time.getFullYear()}  ${time.getHours()}:${time.getMinutes()}`
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});