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
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  }),
    socket.on('send', ({ otherID, id, cnt }) => {
      console.log("Um cliente está enviando dados para o otro...")
      console.log("ID do sender: " + id)
      console.log("ID do reciver: " + otherID);
      console.log("Conteudo: " + cnt)
      if (id != otherID) {
        io.emit("serverSend", { iid: otherID, ootherID: id, ccnt: cnt })
        console.log("Conteudo enviado com sucesso!")
      }



    })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
