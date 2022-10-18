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
    socket.on('askChuva',(id) =>{
        console.log("Cliente esta perguntando se há chuva");
        console.log(id)
       const fs = require('fs');
      var _id = id;
      fs.readFile('database.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        var obj = JSON.parse(data);
        io.emit('resposta', {resposta: obj.chuva.valor,_id : id});
      })
        
    })
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});
