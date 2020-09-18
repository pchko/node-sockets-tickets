const { io } = require('../server');
const { TicketControl } = require('../classes/ticket');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('newTicket', (data, callback) => {
        
        let resp = ticketControl.nextTicket();
        callback && callback({newTicket: resp});
    });

    client.emit('actualTicket', {
        actualTicket : ticketControl.getLastTicket(),
        attendTickets : ticketControl.getLastTicketAttends()
    });

    client.on("attendTicket", (data, callback) => {

        if(!data.escritorio)
            callback && callback({ err: true, message: 'El escritorio es obligatorio'});

        let atenderTicket = ticketControl.attendTicket(data.escritorio);
        callback && callback(atenderTicket);

        //Actualizar ultimos 4 tickets
        client.broadcast.emit('actualTicket', {
            actualTicket : ticketControl.getLastTicket(),
            attendTickets : ticketControl.getLastTicketAttends()
        });
    });
});