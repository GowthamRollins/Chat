const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const router = require('./router');

function getPort() {
  return process.env.PORT || 5000;
}

const PORT = getPort();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(router);

io.on('connection', (socket) => {
  console.log('we have a new connection');

  socket.on('join', ({name, room}, callback) => {
    console.log(name, room);
  });

  socket.on('disconnect', () => {
    console.log('user had left');
  });

});


server.listen(PORT, () => console.log('Server started at port ' + PORT));


