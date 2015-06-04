var galileo = require("galileo-io");
var board = new galileo();
var B = 3975;
var mraa = require("mraa");
var tempPin = new mraa.Aio(0);
var x;
function tempsensor(){
		
		setInterval(function(){
			var a = tempPin.read();
			var resistance = (1023 - a)* 10000/a;
			var celsius = 1/(Math.log(resistance/10000)/B + 1/298.15)-273.15;
			console.log("Temperatura em Celsius: " + celsius);
				//return aki??
		},4000);
	return celsius;	//ou return aki???
}
function ledon(){
	board.digitalWrite(8,1);
	console.log('Led ON');
	
}
function ledoff(){
	board.digitalWrite(8,0);
	console.log('Led OFF')
}
var express = require("express");
var app = express();
app.set('view engine', 'ejs');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(request, response) {
	response.render('action', {
		title: 'Action',
		message: 'This template will have a button underneath.'
	});
});

io.on('connection', function(socket) {
	console.log('user connected');
	socket.emit('connected');
	tempsensor();
	socket.emit('temp',celsius); //botar o emit em loop???
	socket.on('stateChanged', function(state) {
		console.log("Current State: " + state);
		if (state==true){
			ledon();
		}
			else{
				ledoff();
			}
				
		
	});
	socket.on('disconnect',function(){
		console.log('user disconnected');
		});
});

server.listen(8386);
console.log("Server listening!");
