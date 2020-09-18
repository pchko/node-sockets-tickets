const fs = require('fs');


class Ticket{

	constructor(numero){
		this.numero = numero;
		this.escritorio = null;
	}

	setDesktop(desktopNumber){
		this.escritorio = desktopNumber;
	}
}


class TicketControl{

	constructor(){
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.lastTickets = new Array();

		let data = require('../data/data.json');

		if(data.hoy === this.hoy){
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;
		}else{
			this.reiniciarConteo();
		}
	}

	
	nextTicket(){
		this.ultimo++;
		this.pushTicket();
		this.saveArchive();

		return `Ticket ${this.ultimo}`;
	}

	pushTicket(){
		this.tickets.push(new Ticket(this.ultimo));
	}

	
	attendTicket(escritorio){
		
		if(this.tickets.length === 0){
			return false;
		}

		let ticket = this.tickets.shift();
		
		ticket.escritorio = escritorio - 0;

		this.lastTickets.unshift(ticket);

		if(this.lastTickets.length > 4){
			this.lastTickets.pop();
		}

		console.log(this.lastTickets);

		this.saveArchive();

		return ticket;
	}


	reiniciarConteo(){

		this.ultimo = 0;
		this.tickets = [];
		this.ultimos4 = [];
		this.saveArchive();
	}

	getLastTicket(){
		return `Ticket ${this.ultimo}`;
	}

	getLastTicketAttends(){
		return this.lastTickets;
	}

	saveArchive(){
		let jsonData = {
			ultimo : this.ultimo,
			hoy : this.hoy,
			tickets: this.tickets,
			lastTickets: this.lastTickets
		};

		let jsonDataString = JSON.stringify(jsonData);

		fs.writeFileSync('./server/data/data.json', jsonDataString);

		console.log("Se han guardado los datos correctamente");
	}
}

module.exports = {
	TicketControl
}