var socket = io();
var audio = new Audio('audio/new-ticket.mp3');

socket.on('actualTicket', function(data){

	if(data && data.attendTickets){
		data.attendTickets.forEach( (element, index) => {
			$(`#lblTicket${index+1}`).text(`Ticket ${element.numero}`);
			$(`#lblEscritorio${index+1}`).text(`Escritorio ${element.escritorio}`);
		});
		

		
		audio.play();
	}
});