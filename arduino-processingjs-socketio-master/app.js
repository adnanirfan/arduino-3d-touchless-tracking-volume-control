// var http = require('http');
var express = require('express');
var app = express();
// var SerialPort = require("serialport").SerialPort;
// var server = http.createServer(app).listen(3000);
// var io = require('socket.io').listen(server);

var server = app.listen(3000);
var io = require('socket.io').listen(server);
io.set('log level',0);
var socketio;
app.use(express.static(__dirname + '/public'));

require("serialport").list(function(err, ports) {
  console.log(ports);
});
// var serialport = new SerialPort('COM5', {baudrate: 9600}, true ); // replace this address with your port address
// serialport.on('open', function(){
	// Now server is connected to Arduino
	// console.log('Serial Port Opend');

	// var lastValue;
	io.sockets.on('connection', function (socket) {
		socketio = socket;
		//Connecting to client 
		console.log('Socket connected');
		socket.emit('connected');
		// var lastValue;
		// socket.emit('data', angle);

		// serialport.on('data', function(data){
		// 	var angle = data[0];
		// 	if(lastValue !== angle){
		// 		socket.emit('data', angle);
		// 	}
		// 	lastValue = angle;
		// });
	});
// });

app.get('/', function(req, res){
	res.render('index.html')
});
app.get('/max', function(req, res){
	console.log('MAX')
	socketio.emit('max', 1);
	res.end();	
});
app.get('/mid', function(req, res){
	socketio.emit('mid', 0.6);
	console.log('MID')	
	res.end();					
});
app.get('/min', function(req, res){
	console.log('MIN')
	socketio.emit('min', 0.1);
	res.end();	
});
