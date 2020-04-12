const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const router = require('./router');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

function getPort() {
  return process.env.PORT || 5000;
}

const PORT = getPort();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({name, room}, callback) => {
    const {error, user} = addUser({id: socket.id, name, room});
    console.log(user, '------------->', error);


    if (error) {
      callback(error);
    }

    socket.emit('message', {user: 'admin', text: `${user.name} Welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit(`message`, {user: 'admin', text: `${user.name}, has joined`});

    socket.join(user.room);

    callback();

  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', {user: user.name, text: message})
  });

  socket.on('disconnect', () => {
    console.log('user had left');
  });

});


server.listen(PORT, () => console.log('Server started at port ' + PORT));


