var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
	window.location = 'index.html';
	throw new Error('El escritorio es necesario');
}


var desktopNumber = searchParams.get('escritorio');

$("h1").text(`Escritorio: ${desktopNumber}`);

let small = $("small");

$('button').click(function(){

	socket.emit('attendTicket', {escritorio: desktopNumber}, function(response){
		console.log(response);
		small.text(response.numero ? `Ticket: ${response.numero}` : `No hay tickets por atender`);
	});

});

socket.on('actualTicket', function(data){
	console.log(data);
});