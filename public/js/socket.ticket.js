var socket = io();

socket.on('connect', function(){
	console.log("Conectado al server");
});

socket.on('disconnect', function(){
	console.log("Desconectado del server");
});

$('a').click(function(){

	socket.emit('newTicket', null, function(response){
		console.log(response);
		$("#lblNuevoTicket").text(response.newTicket);
	});

});

socket.on('actualTicket', function(data){
	$("#lblNuevoTicket").text(data.actualTicket);
});