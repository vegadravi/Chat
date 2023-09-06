const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.port || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('user joined');
});

socket.on('message', (data) => {
    io.in(data.room).emit('new message', {user: data.user, message: data.message});
});
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));       