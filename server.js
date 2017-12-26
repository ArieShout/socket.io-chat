var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
    var invocationId = 0;
    socket.on('echo', data => {
        io.sockets.connected[socket.id].emit('echo', data);
        // for SignalR, type is 3, we added some padding data 123456 to make sure the message length matches SignalR
        socket.emit(null, {invocationId: "" + invocationId++, type: 3123456});
    });
    socket.on('broadcast', data => {
        io.emit('broadcast', data);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
