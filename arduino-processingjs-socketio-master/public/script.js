var dialogue = document.getElementById('dialogue');
var box = document.getElementById('angle');
var vid = document.getElementById("myVideo");
vid.volume = 0.1;

socket.on('connected', function(){
	dialogue.innerHTML = "Socket Connected";
});
socket.on('disconnect', function(){
	dialogue.innerHTML = "Socket Disconnected";
});
socket.on('max', function (data) {
	vid.volume = data;
	console.log('MAX ', vid.volume, ' ', data)
});
socket.on('mid', function (data) {
	console.log('MID ', data)
	vid.volume = data;
});
socket.on('min', function (data) {
	console.log('MIN ', data)
	vid.volume = data;
});
