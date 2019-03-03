var io = require('socket.io').listen(5250);
 
io.sockets.on('connection', function (socket) {
  console.log("client connected!");
  
  // Echo back messages from the client
  socket.on('message', function (message) {
    console.log("Got message: " + message);
    socket.emit('message', message);
  });  
});