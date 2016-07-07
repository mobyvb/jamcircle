var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var loops = require('./loops.js');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

var connections = {};
var numConnections = 0;

io.on('connection', function(socket) {
  connections[socket.id] = socket;
  numConnections ++;
  socket.emit('setup', { socketId: socket.id });

  console.log('user connected');
  console.log(numConnections + ' users connected');

  socket.on('disconnect', function(){
    delete connections[socket.id];
    numConnections --;

    console.log('user disconnected');
    console.log(numConnections + ' users connected');
  });

  socket.on('stopnote', function(data) {
    emitAll('stopnote', data);
  });

  socket.on('startnote', function(data) {
    emitAll('startnote', data);
  });

  socket.on('startloop', function(data) {
    console.log('start loop ' + data.loopname);
    loops.startLoop(data.loopname, emitAll);
    emitAll('startloop', data);
  });

  socket.on('stoploop', function(data) {
    console.log('stop loop ' + data.loopname);
    loops.stopLoop(data.loopname);
    emitAll('stoploop', data);
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log('listening on *:3000');
});

function emitAll(eventType, data) {
  for (socketId in connections) {
    if (connections.hasOwnProperty(socketId)) {
      connections[socketId].emit(eventType, data)
    }
  }
}
