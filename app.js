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
  numConnections++;

  emitAll('usersupdated', Object.keys(connections));
  var allLoops = loops.getAllLoops();
  socket.emit('loopsupdated', allLoops);

  socket.on('disconnect', function(){
    delete connections[socket.id];
    numConnections --;

    emitAll('usersupdated', Object.keys(connections));
  });

  socket.on('stopnote', function(data) {
    data.id = socket.id;
    emitAll('stopnote', data);
  });

  socket.on('startnote', function(data) {
    data.id = socket.id;
    emitAll('startnote', data);
  });

  socket.on('startloop', function(data) {
    loops.startLoop(data.name, emitAll);
    var allLoops = loops.getAllLoops();
    emitAll('loopsupdated', allLoops);
  });

  socket.on('stoploop', function(data) {
    loops.stopLoop(data.name);
    var allLoops = loops.getAllLoops();
    emitAll('loopsupdated', allLoops);
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
