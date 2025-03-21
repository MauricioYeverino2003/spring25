const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new Schema({
  content: {type: String}
})

const messageModel = mongoose.model("Message", messageSchema)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', async (socket) => {
  io.emit('chat message', "Someone Connected!");
  socket.nickname = null
  const messageLog = await messageModel.find()
  console.log(messageLog)
  socket.on('disconnect', () => {
    io.emit('chat message', "Someone Left :(");
  });
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    const message = new messageModel();
    message.content = msg;
    message.save().then( m => {
      io.emit('chat message', msg);
    })
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

server.listen(3000, async () => {
  await mongoose.connect("mongodb+srv://mauricioyeverino:Xbox360mau@cluster0.h9dmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  console.log('listening on *:3000');
});

// mongodb+srv://mauricioyeverino:Xbox360mau@cluster0.h9dmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://mauricioyeverino:f6cQfY9V0FWw4HjS@cluster0.h9dmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0