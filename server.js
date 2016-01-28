var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('A user connected: ' +socket.id);

	socket.on('message', function(data){
		console.log(data);

		var sockets = io.sockets.sockets;

		for(var index = 0; index < sockets.length; ++index){
			sockets[index].emit("message", { message: data });
		}

		// sockets.forEach(function(sock){
		// 	if(sock.id != socket.id){
		// 		sock.emit('message', { message: data });
		// 	}
		// });
	});

	socket.on('disconnect', function(){
		console.log("A user disconnected: " +socket.id);
	});
});

http.listen('3000', function(){
	console.log('server is listening');
});